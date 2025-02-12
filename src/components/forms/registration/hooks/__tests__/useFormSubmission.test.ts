import { renderHook, act } from '@testing-library/react';
import { useFormSubmission } from '../useFormSubmission';
import { supabase } from '@/integrations/supabase/client';
import type { FormData, ModelFormFields, DesignerFormFields, SponsorFormFields } from '@/types/forms';

// Mock dependencies
jest.mock('@/integrations/supabase/client');
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

describe('useFormSubmission', () => {
  // Test data
  const mockModelData: ModelFormFields = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phone: '+1234567890',
    experience: 'Professional model with 5 years of experience in fashion shows.',
    height: '170.5',
    bust: '90.5',
    waist: '60.5',
    portfolioLink: 'https://portfolio.com',
    instagramHandle: '@janedoe',
    portfolioFiles: ['file1.jpg', 'file2.jpg']
  };

  const mockDesignerData: DesignerFormFields = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '+1234567890',
    experience: 'Fashion designer with 10 years of experience.',
    brandName: 'JS Designs',
    website: 'https://jsdesigns.com',
    collectionDescription: 'Modern sustainable fashion collection featuring recycled materials.',
    numberOfPieces: 20,
    spaceRequirements: 'Need 100 sq ft of display space',
    collectionFiles: ['collection1.jpg', 'collection2.jpg']
  };

  const mockSponsorData: SponsorFormFields = {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@company.com',
    phone: '+1234567890',
    experience: 'Marketing director with focus on fashion industry.',
    companyName: 'Fashion Corp',
    industry: 'Fashion Retail',
    companyDescription: 'Leading fashion retail company with global presence.',
    marketingGoals: 'Increase brand visibility in luxury market segment.',
    partnershipPreferences: 'Looking for exclusive sponsorship opportunities.'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle model application submission successfully', async () => {
    const mockApplicationId = 'mock-app-id';
    const mockInsertResponse = {
      data: { id: mockApplicationId },
      error: null
    };

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockInsertResponse)
        })
      })
    });

    const { result } = renderHook(() => useFormSubmission());

    await act(async () => {
      await result.current.submitForm(mockModelData, 'model');
    });

    expect(supabase.from).toHaveBeenCalledWith('applications');
    expect(supabase.from).toHaveBeenCalledWith('model_applications');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle designer application submission successfully', async () => {
    const mockApplicationId = 'mock-app-id';
    const mockInsertResponse = {
      data: { id: mockApplicationId },
      error: null
    };

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockInsertResponse)
        })
      })
    });

    const { result } = renderHook(() => useFormSubmission());

    await act(async () => {
      await result.current.submitForm(mockDesignerData, 'designer');
    });

    expect(supabase.from).toHaveBeenCalledWith('applications');
    expect(supabase.from).toHaveBeenCalledWith('designer_applications');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle sponsor application submission successfully', async () => {
    const mockApplicationId = 'mock-app-id';
    const mockInsertResponse = {
      data: { id: mockApplicationId },
      error: null
    };

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockInsertResponse)
        })
      })
    });

    const { result } = renderHook(() => useFormSubmission());

    await act(async () => {
      await result.current.submitForm(mockSponsorData, 'sponsor');
    });

    expect(supabase.from).toHaveBeenCalledWith('applications');
    expect(supabase.from).toHaveBeenCalledWith('sponsor_applications');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle application submission error', async () => {
    const mockError = new Error('Database error');
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: null, error: mockError })
        })
      })
    });

    const { result } = renderHook(() => useFormSubmission());

    await act(async () => {
      await result.current.submitForm(mockModelData, 'model');
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle role-specific submission error', async () => {
    const mockApplicationId = 'mock-app-id';
    const mockRoleError = new Error('Role submission error');
    
    // Mock successful application insert
    (supabase.from as jest.Mock).mockReturnValueOnce({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ 
            data: { id: mockApplicationId }, 
            error: null 
          })
        })
      })
    });

    // Mock failed role-specific insert
    (supabase.from as jest.Mock).mockReturnValueOnce({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ 
            data: null, 
            error: mockRoleError 
          })
        })
      })
    });

    const { result } = renderHook(() => useFormSubmission());

    await act(async () => {
      await result.current.submitForm(mockModelData, 'model');
    });

    expect(result.current.isSubmitting).toBe(false);
  });
}); 


