import request from 'supertest';
import express from 'express';
import { configureSecurityMiddleware } from '../middleware/security';
import { env } from '../config/env';

describe('Security Middleware', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    
    configureSecurityMiddleware(app);
    
    app.get('/test', (req, res) => res.json({ message: 'success' }));
    app.post('/test', (req, res) => res.json(req.body));
  });

  describe('CORS Configuration', () => {
    it('should allow requests from allowed origins', async () => {
      const response = await request(app)
        .get('/test')
        .set('Origin', 'http://localhost:3001');

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3001');
      expect(response.headers['access-control-allow-credentials']).toBe('true');
    });

    it('should block requests from unauthorized origins', async () => {
      const response = await request(app)
        .get('/test')
        .set('Origin', 'http://malicious-site.com');

      expect(response.status).toBe(200);
      expect(response.headers['access-control-allow-origin']).toBeUndefined();
      expect(response.headers['access-control-allow-credentials']).toBeUndefined();
    });

    it('should handle preflight requests correctly', async () => {
      const response = await request(app)
        .options('/test')
        .set('Origin', 'http://localhost:3001')
        .set('Access-Control-Request-Method', 'POST')
        .set('Access-Control-Request-Headers', 'Content-Type');

      expect(response.status).toBe(204);
      expect(response.headers['access-control-allow-methods']).toContain('POST');
      expect(response.headers['access-control-allow-headers']).toContain('Content-Type');
    });
  });

  describe('Security Headers', () => {
    it('should set security headers correctly', async () => {
      const response = await request(app).get('/test');

      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-xss-protection']).toBe('1; mode=block');
      expect(response.headers['content-security-policy']).toBeDefined();
      
      if (env.NODE_ENV === 'production') {
        expect(response.headers['strict-transport-security']).toBeDefined();
      }
    });

    it('should have correct CSP directives', async () => {
      const response = await request(app).get('/test');
      const csp = response.headers['content-security-policy'];

      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
      expect(csp).toContain("img-src 'self' data: https:");
    });
  });

  describe('Rate Limiting', () => {
    it('should allow requests within rate limit', async () => {
      const requests = Array(5).fill(null);
      const responses = await Promise.all(
        requests.map(() => request(app).get('/test'))
      );

      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });

    it('should block requests exceeding rate limit', async () => {
      const requests = Array(env.RATE_LIMIT_MAX_REQUESTS + 1).fill(null);
      
      for (const _ of requests) {
        await request(app).get('/test');
      }

      const response = await request(app).get('/test');
      expect(response.status).toBe(429);
      expect(response.body.retryAfter).toBeDefined();
    });
  });

  describe('Request Validation', () => {
    it('should validate content-type for POST requests', async () => {
      const response = await request(app)
        .post('/test')
        .set('Content-Type', 'text/plain')
        .send('invalid data');

      expect(response.status).toBe(415);
    });

    it('should handle JSON requests correctly', async () => {
      const response = await request(app)
        .post('/test')
        .set('Content-Type', 'application/json')
        .send({ test: 'data' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ test: 'data' });
    });

    it('should reject large requests', async () => {
      // Create a 2MB payload (below the default 10MB limit but above our custom limit)
      const largeData = { data: 'x'.repeat(2 * 1024 * 1024) };
      
      const response = await request(app)
        .post('/test')
        .set('Content-Type', 'application/json')
        .send(largeData);

      expect(response.status).toBe(413);
    });
  });

  describe('Parameter Pollution Prevention', () => {
    it('should handle duplicate query parameters', async () => {
      const response = await request(app)
        .get('/test')
        .query({ param: ['value1', 'value2'] });

      expect(response.status).toBe(200);
      const queryString = new URLSearchParams(response.request.url.split('?')[1]);
      expect(queryString.get('param')).toBe('value1');
    });

    it('should handle duplicate body parameters', async () => {
      const response = await request(app)
        .post('/test')
        .set('Content-Type', 'application/json')
        .send({ param: ['value1', 'value2'] });

      expect(response.status).toBe(200);
      expect(response.body.param).toBe('value1');
    });
  });
}); 


