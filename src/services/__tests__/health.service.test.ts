import { HealthService } from '../health.service';
import { supabase } from '../../lib/supabase/config';
import { PortManager } from '../../utils/port-manager.js';

// Mock dependencies
jest.mock('../../lib/supabase/config.js', () => ({
  supabase: {
    from: jest.fn()
  }
}));

jest.mock('../../utils/port-manager.js', () => ({
  PortManager: {
    isPortAvailable: jest.fn()
  }
}));

describe('HealthService', () => {
  let healthService: HealthService;
  const testPort = 8081;

  beforeEach(() => {
    healthService = new HealthService();
    jest.clearAllMocks();
  });

  describe('getStatus', () => {
    it('should return healthy status when all checks pass', async () => {
      // Mock database check
      const mockFrom = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: { status: 'ok' }, error: null });
      (supabase.from as jest.Mock).mockReturnValue({
        from: mockFrom,
        select: mockSelect,
        single: mockSingle
      });

      // Mock port check
      (PortManager.isPortAvailable as jest.Mock).mockResolvedValue(false);

      const status = await healthService.getStatus(testPort);

      expect(status.status).toBe('healthy');
      expect(status.services.database.status).toBe('healthy');
      expect(status.services.server.status).toBe('healthy');
      expect(status.services.memory.status).toBe('healthy');
    });

    it('should return unhealthy status when database check fails', async () => {
      // Mock database check failure
      const mockFrom = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: null, error: new Error('DB Error') });
      (supabase.from as jest.Mock).mockReturnValue({
        from: mockFrom,
        select: mockSelect,
        single: mockSingle
      });

      // Mock port check
      (PortManager.isPortAvailable as jest.Mock).mockResolvedValue(false);

      const status = await healthService.getStatus(testPort);

      expect(status.status).toBe('unhealthy');
      expect(status.services.database.status).toBe('unhealthy');
    });

    it('should return unhealthy status when server check fails', async () => {
      // Mock database check success
      const mockFrom = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: { status: 'ok' }, error: null });
      (supabase.from as jest.Mock).mockReturnValue({
        from: mockFrom,
        select: mockSelect,
        single: mockSingle
      });

      // Mock port check failure
      (PortManager.isPortAvailable as jest.Mock).mockResolvedValue(true);

      const status = await healthService.getStatus(testPort);

      expect(status.status).toBe('unhealthy');
      expect(status.services.server.status).toBe('unhealthy');
    });

    it('should include memory status in response', async () => {
      // Mock successful checks
      const mockFrom = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: { status: 'ok' }, error: null });
      (supabase.from as jest.Mock).mockReturnValue({
        from: mockFrom,
        select: mockSelect,
        single: mockSingle
      });
      (PortManager.isPortAvailable as jest.Mock).mockResolvedValue(false);

      const status = await healthService.getStatus(testPort);

      expect(status.services.memory).toBeDefined();
      expect(typeof status.services.memory.used).toBe('number');
      expect(typeof status.services.memory.total).toBe('number');
      expect(typeof status.services.memory.percentage).toBe('number');
    });
  });
}); 