import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { verifyTurnstileToken } from '@/lib/turnstile';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract CAPTCHA token separately (optional on contact form)
    const { turnstileToken, ...formBody } = body as Record<string, unknown>;

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
    const validationResult = contactFormSchema.safeParse(formBody);

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

    const { name, email, phone, subject, message } = validationResult.data;

    // Log the submission (in production, you would send an email or save to database)
    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service (e.g., Resend, SendGrid, Nodemailer)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@gurunanak.edu.in',
    //   to: 'contact@gurunanak.edu.in',
    //   subject: `Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
