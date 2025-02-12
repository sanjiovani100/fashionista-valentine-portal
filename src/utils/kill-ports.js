import { exec } from 'child_process';
import { platform } from 'os';
import { createServer } from 'net';
import { promisify } from 'util';

const execAsync = promisify(exec);
const isWindows = platform() === 'win32';

// Check if a port is available
const checkPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      }
      resolve(true);
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    
    server.listen(port);
  });
};

// Get process using port
const getProcessFromPort = async (port) => {
  try {
    const command = isWindows
      ? `netstat -ano | findstr :${port}`
      : `lsof -i :${port} -t`;
    
    const { stdout } = await execAsync(command);
    return stdout;
  } catch (error) {
    return '';
  }
};

// Kill process gracefully first, then forcefully if needed
const killProcess = async (pid, port) => {
  try {
    // Try graceful shutdown first
    const command = isWindows
      ? `taskkill /PID ${pid}`
      : `kill -15 ${pid}`;
    
    await execAsync(command);
    console.log(`Process ${pid} gracefully terminated on port ${port}`);
    return true;
  } catch (error) {
    try {
      // Force kill if graceful shutdown fails
      const forceCommand = isWindows
        ? `taskkill /F /PID ${pid}`
        : `kill -9 ${pid}`;
      
      await execAsync(forceCommand);
      console.log(`Process ${pid} forcefully terminated on port ${port}`);
      return true;
    } catch (error) {
      console.error(`Failed to kill process ${pid}:`, error.message);
      return false;
    }
  }
};

const killPortProcess = async (port) => {
  try {
    // Validate port number
    if (!Number.isInteger(port) || port < 0 || port > 65535) {
      throw new Error(`Invalid port number: ${port}`);
    }

    // Check if port is actually in use
    const isAvailable = await checkPortAvailable(port);
    if (isAvailable) {
      console.log(`Port ${port} is already available`);
      return true;
    }

    const stdout = await getProcessFromPort(port);
    if (!stdout) {
      console.log(`No process found using port ${port}`);
      return false;
    }

    if (isWindows) {
      const pids = new Set();
      stdout.split('\n').forEach(line => {
        const match = line.match(/\s+(\d+)\s*$/);
        if (match) {
          pids.add(match[1]);
        }
      });

      const results = await Promise.all(
        Array.from(pids).map(pid => {
          if (pid !== '0' && pid !== '') {
            return killProcess(pid, port);
          }
          return Promise.resolve(false);
        })
      );

      return results.some(result => result);
    } else {
      const pids = stdout.trim().split('\n');
      const results = await Promise.all(
        pids.map(pid => {
          if (pid) {
            return killProcess(pid, port);
          }
          return Promise.resolve(false);
        })
      );

      return results.some(result => result);
    }
  } catch (error) {
    console.error(`Error processing port ${port}:`, error.message);
    return false;
  }
};

// Main execution
const main = async () => {
  try {
    const ports = process.argv.slice(2).map(Number);

    if (ports.length === 0) {
      console.error('Please specify at least one port number');
      process.exit(1);
    }

    console.log('Starting port management...');
    const results = await Promise.all(ports.map(killPortProcess));
    
    // Verify all ports are now available
    const finalChecks = await Promise.all(ports.map(async (port) => {
      const available = await checkPortAvailable(port);
      if (!available) {
        console.error(`Port ${port} is still in use after attempted cleanup`);
      }
      return available;
    }));

    if (finalChecks.every(result => result)) {
      console.log('All ports successfully processed');
      process.exit(0);
    } else {
      console.error('Some ports could not be freed');
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
};

main(); 