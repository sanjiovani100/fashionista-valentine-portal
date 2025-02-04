import { ChangeManager } from '../utils/ChangeManager';

interface ChangeMetadata {
  component: string;
  type: 'schema' | 'code' | 'data';
  description: string;
  impact: string[];
  rollbackSteps: string[];
  testCases: string[];
}

export function ManagedChange(metadata: ChangeMetadata) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const changeManager = ChangeManager.getInstance();
      
      // Log the start of the change
      await changeManager.logChange(metadata, 'started');

      // Verify the change before execution
      const verification = await changeManager.verifyChange(metadata);
      
      if (!verification.isValid) {
        await changeManager.logChange(metadata, 'failed', new Error(verification.errors.join(', ')));
        throw new Error(`Change verification failed: ${verification.errors.join(', ')}`);
      }

      if (verification.warnings.length > 0) {
        console.warn('Change warnings:', verification.warnings);
      }

      try {
        // Apply the change
        const result = await originalMethod.apply(this, args);
        await changeManager.logChange(metadata, 'completed');
        return result;
      } catch (error) {
        await changeManager.logChange(metadata, 'failed', error);
        throw error;
      }
    };

    return descriptor;
  };
} 