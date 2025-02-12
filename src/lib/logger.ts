import winston from 'winston';
import config from '@/config';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
  level: config.logging.level,
  format: logFormat,
  defaultMeta: { service: 'fashionista-portal' },
  transports: [
    // Write all logs with level 'error' and below to 'error.log'
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs with level 'info' and below to 'combined.log'
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// If we're not in production, log to the console with custom format
if (!config.server.isProduction) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// Create a stream object for Morgan
export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Helper function to log request details
export function logRequest(req: any, message: string, meta: object = {}) {
  logger.info(message, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user?.id,
    ...meta,
  });
}

// Helper function to log errors
export function logError(error: Error, req?: any) {
  const errorMeta: any = {
    stack: error.stack,
  };

  if (req) {
    errorMeta.method = req.method;
    errorMeta.url = req.originalUrl;
    errorMeta.ip = req.ip;
    errorMeta.userId = req.user?.id;
  }

  logger.error(error.message, errorMeta);
}

// Helper function to log performance metrics
export function logPerformance(
  operation: string,
  durationMs: number,
  meta: object = {}
) {
  logger.info(`Performance: ${operation}`, {
    operation,
    durationMs,
    ...meta,
  });
}

// Helper function to log security events
export function logSecurity(
  event: string,
  success: boolean,
  meta: object = {}
) {
  logger.warn(`Security: ${event}`, {
    event,
    success,
    ...meta,
  });
}

// Helper function to log database operations
export function logDatabase(
  operation: string,
  table: string,
  meta: object = {}
) {
  logger.debug(`Database: ${operation}`, {
    operation,
    table,
    ...meta,
  });
}

export default logger; 


