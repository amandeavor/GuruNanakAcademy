import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyTurnstileToken } from '@/lib/turnstile';

const feePaymentSchema = z.object({
  admissionId: z.string().min(3),
  studentName: z.string().min(2),
  gradeClass: z.string().min(1),
  feeType: z.enum(['Tuition Fee', 'Admission Fee', 'Examination Fee', 'Transport Fee', 'Hostel Fee', 'Miscellaneous Fee']),
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num <= 500000;
  }, 'Invalid amount'),
  parentName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  turnstileToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = feePaymentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const captcha = await verifyTurnstileToken(data.turnstileToken);
    if (!captcha.success) {
      return NextResponse.json(
        { success: false, error: captcha.error ?? 'CAPTCHA verification failed' },
        { status: 422 }
      );
    }

    console.log('Fee Payment Submission:', {
      studentName: data.studentName,
      admissionId: data.admissionId,
      gradeClass: data.gradeClass,
      feeType: data.feeType,
      amount: data.amount,
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Payment details received. Proceed to gateway.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
