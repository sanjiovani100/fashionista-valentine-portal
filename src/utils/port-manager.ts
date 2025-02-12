import { createServer } from 'net';
import { logger } from '../config/logger.js';

export class PortManager {
  /**
   * Check if a port is available
   * @param port Port number to check
   * @returns Promise<boolean> True if port is available
   */
  static async isPortAvailable(port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const server = createServer()
        .listen(port, () => {
          server.close();
          resolve(true);
        })
        .on('error', () => {
          resolve(false);
        });
    });
  }

  /**
   * Find the next available port starting from a base port
   * @param basePort Starting port number
   * @param maxAttempts Maximum number of ports to try
   * @returns Promise<number> Available port number or throws error
   */
  static async findAvailablePort(basePort: number, maxAttempts: number = 10): Promise<number> {
    for (let port = basePort; port < basePort + maxAttempts; port++) {
      const isAvailable = await this.isPortAvailable(port);
      if (isAvailable) {
        logger.info(`Found available port: ${port}`);
        return port;
      }
      logger.debug(`Port ${port} is in use, trying next port`);
    }
    throw new Error(`No available ports found between ${basePort} and ${basePort + maxAttempts - 1}`);
  }

  /**
   * Get a port number, either from environment or find an available one
   * @param envPort Port number from environment
   * @param defaultPort Default port to use
   * @returns Promise<number> Port number to use
   */
  static async getPort(envPort?: string | number, defaultPort: number = 8081): Promise<number> {
    const port = envPort ? parseInt(envPort.toString(), 10) : defaultPort;
    
    try {
      if (await this.isPortAvailable(port)) {
        logger.info(`Using configured port: ${port}`);
        return port;
      }
      
      logger.warn(`Port ${port} is in use, searching for available port`);
      return await this.findAvailablePort(port + 1);
    } catch (error) {
      logger.error('Error finding available port:', error);
      throw error;
    }
  }
} 