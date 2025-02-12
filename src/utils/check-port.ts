import net from 'net';

export const checkPort = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => {
      resolve(false);
    });

    server.once('listening', () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
};

// If this file is run directly
if (require.main === module) {
  const port = parseInt(process.env.PORT || '8080', 10);
  
  checkPort(port)
    .then((isAvailable) => {
      if (isAvailable) {
        console.log(`✅ Port ${port} is available`);
        process.exit(0);
      } else {
        console.error(`❌ Port ${port} is already in use`);
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Error checking port:', error);
      process.exit(1);
    });
} 


