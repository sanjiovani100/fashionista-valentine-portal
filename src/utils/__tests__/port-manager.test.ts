import { createServer } from 'net';
import { PortManager } from '../port-manager.js';

describe('PortManager', () => {
  let occupiedPort: number;
  let server: any;

  beforeAll(async () => {
    // Find and occupy a port for testing
    occupiedPort = 3000;
    server = createServer().listen(occupiedPort);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('isPortAvailable', () => {
    it('should return true for an available port', async () => {
      const result = await PortManager.isPortAvailable(3001);
      expect(result).toBe(true);
    });

    it('should return false for an occupied port', async () => {
      const result = await PortManager.isPortAvailable(occupiedPort);
      expect(result).toBe(false);
    });
  });

  describe('findAvailablePort', () => {
    it('should find the next available port', async () => {
      const port = await PortManager.findAvailablePort(occupiedPort);
      expect(port).toBe(occupiedPort + 1);
    });

    it('should throw error if no ports are available', async () => {
      const maxAttempts = 2;
      // Occupy two consecutive ports
      const server2 = createServer().listen(occupiedPort + 1);
      
      await expect(PortManager.findAvailablePort(occupiedPort, maxAttempts))
        .rejects
        .toThrow(`No available ports found between ${occupiedPort} and ${occupiedPort + maxAttempts - 1}`);
      
      server2.close();
    });
  });

  describe('getPort', () => {
    it('should use provided port if available', async () => {
      const port = await PortManager.getPort(3002);
      expect(port).toBe(3002);
    });

    it('should find next available port if provided port is occupied', async () => {
      const port = await PortManager.getPort(occupiedPort);
      expect(port).toBe(occupiedPort + 1);
    });

    it('should use default port if no port provided', async () => {
      const port = await PortManager.getPort();
      expect(port).toBeGreaterThanOrEqual(8081);
    });
  });
}); 