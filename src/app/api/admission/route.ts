import { NextRequest, NextResponse } from 'next/server';
import { admissionFormSchema } from '@/lib/validations';
import { verifyTurnstileToken } from '@/lib/turnstile';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract CAPTCHA token before schema validation (it's not in admissionFormSchema)
    const { turnstileToken, ...formBody } = body as Record<string, unknown>;

    // Verify Turnstile CAPTCHA server-side
    if (typeof turnstileToken === 'string' && turnstileToken) {
      const captcha = await verifyTurnstileToken(turnstileToken);
      if (!captcha.success) {
        return NextResponse.json(
          { success: false, error: captcha.error ?? 'CAPTCHA verification failed' },
          { status: 422 }
        );
      }
    }

    // Validate the request body
    const validationResult = admissionFormSchema.safeParse(formBody);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Log the submission (in production, you would send an email or save to database)
    console.log('Admission Form Submission:', {
      ...formData,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service and/or database
    // Example: Save to database
    // await prisma.admissionApplication.create({
    //   data: {
    //     ...formData,
    //     status: 'PENDING',
    //   },
    // });

    // Example: Send notification email
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@gurunanak.edu.in',
    //   to: 'admissions@gurunanak.edu.in',
    //   subject: `New Admission Application - ${formData.studentName}`,
    //   html: `
    //     <h2>New Admission Application</h2>
    //     <p><strong>Student Name:</strong> ${formData.studentName}</p>
    //     <p><strong>Class Applied For:</strong> ${formData.classOfAdmission}</p>
    //     <p><strong>Father's Name:</strong> ${formData.fatherName}</p>
    //     <p><strong>Mother's Name:</strong> ${formData.motherName}</p>
    //     <p><strong>Contact:</strong> ${formData.contactNumber}</p>
    //     <p><strong>Email:</strong> ${formData.email}</p>
    //     <p><strong>Address:</strong> ${formData.address}</p>
    //     <p><strong>Previous Class:</strong> ${formData.classLastAttended}</p>
    //     ${formData.message ? `<p><strong>Additional Info:</strong> ${formData.message}</p>` : ''}
    //   `,
    // });

    // Send confirmation email to applicant
    // await resend.emails.send({
    //   from: 'noreply@gurunanak.edu.in',
    //   to: formData.email,
    //   subject: 'Admission Application Received - Guru Nanak Academy',
    //   html: `
    //     <h2>Thank You for Your Application</h2>
    //     <p>Dear ${formData.fatherName} / ${formData.motherName},</p>
    //     <p>We have received the admission application for <strong>${formData.studentName}</strong> 
    //        for Class <strong>${formData.classOfAdmission}</strong>.</p>
    //     <p>Our admissions team will review the application and contact you shortly.</p>
    //     <p>Best regards,<br>Admissions Team<br>Guru Nanak Academy</p>
    //   `,
    // });

    return NextResponse.json(
      {
        success: true,
        message:
          'Your admission application has been submitted successfully. Our team will contact you shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admission form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
