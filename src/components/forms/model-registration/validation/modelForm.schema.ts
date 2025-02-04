import { z } from 'zod';
import { ExperienceLevel, TimePreference, ModelRole } from '../types/model.types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_VIDEO_TYPES = ['video/mp4'];
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export const modelFormSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(/^\+?[\d\s-()]{10,}$/, 'Invalid phone number'),
  dateOfBirth: z.date().max(new Date(), 'Date of birth cannot be in the future'),
  socialMediaLinks: z.object({
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),

  // Physical Details
  physicalDetails: z.object({
    height: z.number().min(100, 'Height must be at least 100cm').max(250, 'Height must be less than 250cm'),
    weight: z.number().min(30, 'Weight must be at least 30kg').max(200, 'Weight must be less than 200kg').optional(),
    bustChest: z.number().min(50, 'Bust/Chest must be at least 50cm').max(150, 'Bust/Chest must be less than 150cm').optional(),
    waist: z.number().min(40, 'Waist must be at least 40cm').max(150, 'Waist must be less than 150cm').optional(),
    hips: z.number().min(50, 'Hips must be at least 50cm').max(150, 'Hips must be less than 150cm').optional(),
    shoeSize: z.string().min(1, 'Shoe size is required'),
    hairColor: z.string().min(1, 'Hair color is required'),
    eyeColor: z.string().min(1, 'Eye color is required'),
  }),

  // Experience and Portfolio
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Professional'] as const),
  portfolio: z.object({
    images: z.array(z.custom<File>())
      .refine((files) => files.length <= 10, 'Maximum 10 files allowed')
      .refine(
        (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
        'Each file must be less than 10MB'
      )
      .refine(
        (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
        'Only .jpg, .jpeg, and .png files are accepted'
      ),
    video: z.custom<File>()
      .refine((file) => !file || file.size <= MAX_VIDEO_SIZE, 'Video must be less than 50MB')
      .refine(
        (file) => !file || ACCEPTED_VIDEO_TYPES.includes(file.type),
        'Only .mp4 files are accepted'
      )
      .optional(),
    previousEvents: z.string().optional(),
  }),

  // Availability and Preferences
  availability: z.object({
    dates: z.array(z.date()).min(1, 'Please select at least one date'),
    timePreference: z.enum(['Morning', 'Afternoon', 'Evening'] as const),
    willTravel: z.boolean(),
  }),

  preferences: z.object({
    role: z.enum(['Runway', 'Photoshoot', 'Both'] as const),
    designerPreferences: z.string().optional(),
  }),

  // Emergency Contact
  emergencyContact: z.object({
    name: z.string().min(2, 'Emergency contact name must be at least 2 characters'),
    relationship: z.string().min(2, 'Relationship must be at least 2 characters'),
    phoneNumber: z.string().regex(/^\+?[\d\s-()]{10,}$/, 'Invalid phone number'),
  }),

  // Terms
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}); 