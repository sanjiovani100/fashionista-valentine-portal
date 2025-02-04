import { supabase } from '../lib/supabase';
import { ManagedChange } from '../lib/decorators/ManagedChange';
import type { ModelProfile } from '../types/models';

export class ModelService {
  @ManagedChange({
    component: 'ModelService',
    type: 'data',
    description: 'Update model profile information',
    impact: [
      'Model profile data',
      'Search indexing',
      'Portfolio display'
    ],
    rollbackSteps: [
      'Restore previous profile data',
      'Reindex search data',
      'Clear cache'
    ],
    testCases: [
      'Verify profile data integrity',
      'Check search functionality',
      'Validate portfolio display'
    ]
  })
  async updateProfile(modelId: string, updates: Partial<ModelProfile>): Promise<void> {
    const { error } = await supabase
      .from('models')
      .update(updates)
      .eq('id', modelId);

    if (error) throw error;
  }

  @ManagedChange({
    component: 'ModelService',
    type: 'schema',
    description: 'Add new portfolio fields to model profile',
    impact: [
      'Database schema',
      'API responses',
      'Frontend forms'
    ],
    rollbackSteps: [
      'Remove new columns',
      'Restore old schema version',
      'Update API version'
    ],
    testCases: [
      'Verify schema migration',
      'Test API compatibility',
      'Validate form handling'
    ]
  })
  async addPortfolioFields(): Promise<void> {
    const { error } = await supabase.rpc('add_portfolio_fields');
    if (error) throw error;
  }

  @ManagedChange({
    component: 'ModelService',
    type: 'code',
    description: 'Update model search algorithm',
    impact: [
      'Search functionality',
      'Performance metrics',
      'User experience'
    ],
    rollbackSteps: [
      'Restore previous search implementation',
      'Reset search indexes',
      'Clear search cache'
    ],
    testCases: [
      'Verify search accuracy',
      'Test performance impact',
      'Validate result ranking'
    ]
  })
  async updateSearchAlgorithm(): Promise<void> {
    // Implementation of search algorithm update
  }
} 