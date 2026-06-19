import { contactFormSchema, admissionFormSchema, newsletterSchema } from '@/lib/validations';

describe('Contact Form Schema', () => {
  it('validates a correct contact form', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General Inquiry',
      message: 'This is a test message for the contact form.',
    };

    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('validates with optional phone', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      subject: 'Admission Inquiry',
      message: 'I would like to know about admissions.',
    };

    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Test Subject',
      message: 'This is a test message.',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('rejects short name', () => {
    const invalidData = {
      name: 'J',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message.',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('name');
    }
  });

  it('rejects short message', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Short',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('message');
    }
  });
});

describe('Admission Form Schema', () => {
  const validAdmissionData = {
    studentName: 'Arjun Singh',
    dateOfBirth: '2010-05-15',
    fatherName: 'Gurpreet Singh',
    motherName: 'Simran Kaur',
    classApplying: '6',
    contactNumber: '9876543210',
    email: 'parent@example.com',
    address: '123 Main Street, Sector 15, Model Town',
    city: 'Dehradun',
    state: 'Uttarakhand',
    pincode: '248001',
    boardingRequired: 'none' as const,
  };

  it('validates a correct admission form', () => {
    const result = admissionFormSchema.safeParse(validAdmissionData);
    expect(result.success).toBe(true);
  });

  it('validates with optional fields', () => {
    const dataWithOptionals = {
      ...validAdmissionData,
      classLastAttended: '5',
      previousSchool: 'St. Mary School',
      alternateNumber: '9123456789',
      message: 'Looking forward to admission.',
    };

    const result = admissionFormSchema.safeParse(dataWithOptionals);
    expect(result.success).toBe(true);
  });

  it('accepts boarding options', () => {
    const dataWithBoarding = {
      ...validAdmissionData,
      boardingRequired: 'boarding' as const,
    };

    const result = admissionFormSchema.safeParse(dataWithBoarding);
    expect(result.success).toBe(true);
  });

  it('rejects invalid phone number', () => {
    const invalidData = {
      ...validAdmissionData,
      contactNumber: '123',
    };

    const result = admissionFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('rejects invalid pincode', () => {
    const invalidData = {
      ...validAdmissionData,
      pincode: '12345',
    };

    const result = admissionFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('requires all mandatory fields', () => {
    const incompleteData = {
      studentName: 'Arjun Singh',
      email: 'parent@example.com',
    };

    const result = admissionFormSchema.safeParse(incompleteData);
    expect(result.success).toBe(false);
  });
});

describe('Newsletter Schema', () => {
  it('validates a correct email', () => {
    const result = newsletterSchema.safeParse({ email: 'user@example.com' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = newsletterSchema.safeParse({ email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects empty email', () => {
    const result = newsletterSchema.safeParse({ email: '' });
    expect(result.success).toBe(false);
  });
});
