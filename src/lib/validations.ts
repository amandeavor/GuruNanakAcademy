import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[\d\s-]{10,15}$/.test(val),
      'Please enter a valid phone number'
    ),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Admission Form Schema
export const admissionFormSchema = z.object({
  studentName: z
    .string()
    .min(2, 'Student name must be at least 2 characters')
    .max(100, 'Student name must be less than 100 characters'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required'),
  fatherName: z
    .string()
    .min(2, 'Father\'s name must be at least 2 characters')
    .max(100, 'Father\'s name must be less than 100 characters'),
  motherName: z
    .string()
    .min(2, 'Mother\'s name must be at least 2 characters')
    .max(100, 'Mother\'s name must be less than 100 characters'),
  classApplying: z
    .string()
    .min(1, 'Please select a class'),
  classLastAttended: z
    .string()
    .optional(),
  previousSchool: z
    .string()
    .optional(),
  contactNumber: z
    .string()
    .min(10, 'Please enter a valid contact number')
    .refine(
      (val) => /^[+]?[\d\s-]{10,15}$/.test(val),
      'Please enter a valid phone number'
    ),
  alternateNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[\d\s-]{10,15}$/.test(val),
      'Please enter a valid phone number'
    ),
  email: z
    .string()
    .email('Please enter a valid email address'),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
  city: z
    .string()
    .min(2, 'City is required'),
  state: z
    .string()
    .min(2, 'State is required'),
  pincode: z
    .string()
    .min(6, 'Please enter a valid pincode')
    .max(6, 'Please enter a valid pincode'),
  boardingRequired: z
    .enum(['none', 'boarding', 'dayboarding']),
  message: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length <= 1000,
      'Message must be less than 1000 characters'
    ),
});

export type AdmissionFormData = z.infer<typeof admissionFormSchema>;

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
