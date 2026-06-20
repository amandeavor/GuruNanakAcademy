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

    // Verify CAPTCHA
    const captcha = await verifyTurnstileToken(data.turnstileToken);
    if (!captcha.success) {
      return NextResponse.json(
        { success: false, error: captcha.error ?? 'CAPTCHA verification failed' },
        { status: 422 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const isMockMode =
      !keyId ||
      !keySecret ||
      keyId === 'rzp_test_yourKeyId' ||
      keySecret === 'yourKeySecret';

    const amountInPaise = Math.round(parseFloat(data.amount) * 100);

    if (isMockMode) {
      console.warn('[Razorpay] Warning: Credentials missing or template defaults used. Operating in Mock Mode.');

      const mockOrderId = `order_mock_${Math.floor(100000 + Math.random() * 900000)}`;
      return NextResponse.json({
        success: true,
        orderId: mockOrderId,
        amount: amountInPaise,
        currency: 'INR',
        keyId: 'mock_key_id',
        mockMode: true,
        message: 'Mock order created successfully.'
      });
    }

    // Call Razorpay API to create an order
    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`;

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${data.admissionId}_${Date.now()}`,
        notes: {
          studentName: data.studentName,
          admissionId: data.admissionId,
          feeType: data.feeType,
          parentName: data.parentName,
          email: data.email,
          phone: data.phone,
        }
      }),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error('[Razorpay] Order creation failed:', errorText);
      return NextResponse.json(
        { success: false, error: 'Razorpay order creation failed.' },
        { status: 502 }
      );
    }

    const order = await razorpayResponse.json();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keyId,
      mockMode: false,
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
