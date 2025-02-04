import { DEVELOPMENT_STANDARDS } from '../config/development-standards';

type ValidationResult = {
  isValid: boolean;
  errors: string[];
  warnings: string[];
};

export class StandardsValidator {
  static validateEventData(eventData: any): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // Check required fields
    DEVELOPMENT_STANDARDS.eventManagement.validation.requiredFields.forEach(field => {
      if (!eventData[field]) {
        result.isValid = false;
        result.errors.push(`Missing required field: ${field}`);
      }
    });

    // Validate event date
    if (eventData.eventDate) {
      const eventDate = new Date(eventData.eventDate);
      const now = new Date();
      const twoWeeksFromNow = new Date(now.setDate(now.getDate() + 14));
      const oneYearFromNow = new Date(now.setFullYear(now.getFullYear() + 1));

      if (eventDate < twoWeeksFromNow) {
        result.isValid = false;
        result.errors.push('Event must be scheduled at least 2 weeks in advance');
      }

      if (eventDate > oneYearFromNow) {
        result.isValid = false;
        result.errors.push('Event cannot be scheduled more than 1 year in advance');
      }
    }

    return result;
  }

  static validateModelProfile(profileData: any): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // Check required measurements
    DEVELOPMENT_STANDARDS.modelManagement.profileValidation.requiredMeasurements.forEach(measurement => {
      if (!profileData[measurement]) {
        result.isValid = false;
        result.errors.push(`Missing required measurement: ${measurement}`);
      }
    });

    // Validate photos
    if (profileData.photos) {
      const { minPhotos, maxPhotos, allowedFormats, maxSizeMB } = DEVELOPMENT_STANDARDS.modelManagement.profileValidation.photoRequirements;

      if (profileData.photos.length < minPhotos) {
        result.isValid = false;
        result.errors.push(`Minimum ${minPhotos} photos required`);
      }

      if (profileData.photos.length > maxPhotos) {
        result.isValid = false;
        result.errors.push(`Maximum ${maxPhotos} photos allowed`);
      }

      profileData.photos.forEach((photo: any) => {
        const format = photo.format || photo.type;
        if (!allowedFormats.includes(format.toLowerCase())) {
          result.isValid = false;
          result.errors.push(`Invalid photo format: ${format}. Allowed formats: ${allowedFormats.join(', ')}`);
        }

        if (photo.size > maxSizeMB * 1024 * 1024) {
          result.isValid = false;
          result.errors.push(`Photo size exceeds maximum allowed size of ${maxSizeMB}MB`);
        }
      });
    }

    return result;
  }

  static validateSponsorshipTier(tierData: any): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    const tier = tierData.tier?.toLowerCase();
    if (!tier || !DEVELOPMENT_STANDARDS.sponsorManagement.tierRequirements[tier]) {
      result.isValid = false;
      result.errors.push('Invalid sponsorship tier');
      return result;
    }

    const tierRequirements = DEVELOPMENT_STANDARDS.sponsorManagement.tierRequirements[tier];

    // Validate commitment period
    if (tierData.commitmentPeriod) {
      const minCommitment = parseInt(tierRequirements.minCommitment.split(' ')[0]);
      const commitmentPeriod = parseInt(tierData.commitmentPeriod.split(' ')[0]);

      if (commitmentPeriod < minCommitment) {
        result.isValid = false;
        result.errors.push(`${tier} tier requires minimum commitment of ${tierRequirements.minCommitment}`);
      }
    }

    // Validate brand assets
    if (tierData.logo) {
      const { minWidth, minHeight, formats } = DEVELOPMENT_STANDARDS.sponsorManagement.brandAssets.logoRequirements;

      if (tierData.logo.width < minWidth || tierData.logo.height < minHeight) {
        result.isValid = false;
        result.errors.push(`Logo must be at least ${minWidth}x${minHeight} pixels`);
      }

      if (!formats.includes(tierData.logo.format.toLowerCase())) {
        result.isValid = false;
        result.errors.push(`Invalid logo format. Allowed formats: ${formats.join(', ')}`);
      }
    }

    return result;
  }

  static validatePerformanceMetrics(metrics: any): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    const { pageLoadTime, apiResponseTime, imageLoadTime } = DEVELOPMENT_STANDARDS.performance.metrics;

    if (metrics.pageLoad > parseInt(pageLoadTime)) {
      result.warnings.push(`Page load time exceeds target of ${pageLoadTime}`);
    }

    if (metrics.apiResponse > parseInt(apiResponseTime)) {
      result.warnings.push(`API response time exceeds target of ${apiResponseTime}`);
    }

    if (metrics.imageLoad > parseInt(imageLoadTime)) {
      result.warnings.push(`Image load time exceeds target of ${imageLoadTime}`);
    }

    return result;
  }

  static validateAccessibility(component: any): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    DEVELOPMENT_STANDARDS.accessibility.requirements.forEach(requirement => {
      if (!component[requirement]) {
        result.warnings.push(`Missing accessibility requirement: ${requirement}`);
      }
    });

    return result;
  }

  static validateApiResponse(response: any): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    DEVELOPMENT_STANDARDS.api.response.standardFields.forEach(field => {
      if (!response.hasOwnProperty(field)) {
        result.warnings.push(`API response missing standard field: ${field}`);
      }
    });

    return result;
  }
} 