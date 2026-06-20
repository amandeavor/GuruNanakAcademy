import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment verification details.' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const isMockMode =
      !keyId ||
      !keySecret ||
      keyId === 'rzp_test_yourKeyId' ||
      keySecret === 'yourKeySecret' ||
      razorpay_order_id.startsWith('order_mock_');

    if (isMockMode) {
      console.log('[Razorpay Verification] Verifying mock order transaction:', razorpay_order_id);
      return NextResponse.json({
        success: true,
        message: 'Mock payment verified successfully.',
        transactionId: razorpay_payment_id
      });
    }

    // Cryptographic signature verification
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', keySecret!)
      .update(text)
      .digest('hex');

    const isValid = generatedSignature === razorpay_signature;

    if (isValid) {
      console.log('[Razorpay Verification] Successful verification:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully.',
        transactionId: razorpay_payment_id
      });
    } else {
      console.error('[Razorpay Verification] Signature mismatch:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        expected: generatedSignature,
        received: razorpay_signature
      });

      return NextResponse.json(
        { success: false, error: 'Payment signature verification failed.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification API error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred during verification.' },
      { status: 500 }
    );
  }
}
