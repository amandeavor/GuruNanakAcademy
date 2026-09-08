'use client';

import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { TurnstileShield } from '@/components/shared/turnstile-shield';
import { CLASS_OPTIONS } from '@/lib/constants';
import {
  Check,
  Loader2,
  AlertCircle,
  CreditCard,
  User,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeePaymentSchema = z.object({
  admissionId: z.string().min(3, 'Valid Admission ID or Roll Number is required'),
  studentName: z.string().min(2, 'Student full name is required'),
  gradeClass: z.string().min(1, 'Select candidate class'),
  feeType: z.enum([
    'Tuition Fee',
    'Admission Fee',
    'Examination Fee',
    'Transport Fee',
    'Hostel Fee',
    'Miscellaneous Fee',
  ]),
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, 'Amount must be a positive number'),
  parentName: z.string().min(2, 'Parent/Guardian full name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Provide a valid 10-digit mobile number'),
  turnstileToken: z.string().min(1, 'CAPTCHA verification is required'),
});

type FeePaymentData = z.infer<typeof FeePaymentSchema>;

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export function FeePortalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileKeyCounter, setTurnstileKeyCounter] = useState(0); // To reset widget on error/expire
  const [paymentStatus, setPaymentStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    receipt?: {
      transactionId: string;
      date: string;
      studentName: string;
      admissionId: string;
      gradeClass: string;
      feeType: string;
      amount: string;
      parentName: string;
      email: string;
      phone: string;
    };
  }>({ type: null, message: '' });

  const formMethods = useForm<FeePaymentData>({
    resolver: zodResolver(FeePaymentSchema),
    mode: 'onBlur',
    defaultValues: {
      admissionId: '',
      studentName: '',
      gradeClass: 'Class 1',
      feeType: 'Tuition Fee',
      amount: '',
      parentName: '',
      email: '',
      phone: '',
      turnstileToken: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
    watch,
  } = formMethods;
  const captchaToken = watch('turnstileToken');

  const executePaymentSubmit = async (data: FeePaymentData) => {
    setIsSubmitting(true);
    setPaymentStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        setPaymentStatus({
          type: 'error',
          message:
            result.error || 'There was an error creating the payment session. Please try again.',
        });
        setValue('turnstileToken', '');
        setTurnstileKeyCounter((prev) => prev + 1);
        setIsSubmitting(false);
        return;
      }

      if (result.mockMode) {
        console.log('Mock Mode Enabled: Simulating client-side payment verification.');
        setTimeout(async () => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: `pay_mock_${Math.floor(100000 + Math.random() * 900000)}`,
                razorpay_order_id: result.orderId,
                razorpay_signature: 'mock_signature_data',
              }),
            });

            const verifyResult = await verifyRes.json();
            if (verifyRes.ok && verifyResult.success) {
              const currentDate = new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              setPaymentStatus({
                type: 'success',
                message: 'Payment transaction completed successfully (Test Mock Mode)!',
                receipt: {
                  transactionId: verifyResult.transactionId,
                  date: currentDate,
                  studentName: data.studentName,
                  admissionId: data.admissionId,
                  gradeClass: data.gradeClass,
                  feeType: data.feeType,
                  amount: data.amount,
                  parentName: data.parentName,
                  email: data.email,
                  phone: data.phone,
                },
              });
            } else {
              setPaymentStatus({
                type: 'error',
                message: verifyResult.error || 'Mock payment verification failed.',
              });
              setValue('turnstileToken', '');
              setTurnstileKeyCounter((prev) => prev + 1);
            }
          } catch (err) {
            setPaymentStatus({
              type: 'error',
              message: 'An error occurred verifying mock payment transaction details.',
            });
            setValue('turnstileToken', '');
            setTurnstileKeyCounter((prev) => prev + 1);
          } finally {
            setIsSubmitting(false);
          }
        }, 1500);
        return;
      }

      // Live/Test Razorpay Checkout Mode
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setPaymentStatus({
          type: 'error',
          message: 'Failed to load Razorpay Payment Gateway SDK script. Please try again.',
        });
        setValue('turnstileToken', '');
        setTurnstileKeyCounter((prev) => prev + 1);
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: result.keyId,
        amount: result.amount,
        currency: result.currency,
        name: 'Guru Nanak Academy',
        description: `Fee Payment - ${data.feeType}`,
        order_id: result.orderId,
        handler: async (paymentResponse: any) => {
          setIsSubmitting(true);
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            });

            const verifyResult = await verifyRes.json();
            if (verifyRes.ok && verifyResult.success) {
              const currentDate = new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              setPaymentStatus({
                type: 'success',
                message: 'Payment transaction completed successfully!',
                receipt: {
                  transactionId: paymentResponse.razorpay_payment_id,
                  date: currentDate,
                  studentName: data.studentName,
                  admissionId: data.admissionId,
                  gradeClass: data.gradeClass,
                  feeType: data.feeType,
                  amount: data.amount,
                  parentName: data.parentName,
                  email: data.email,
                  phone: data.phone,
                },
              });
            } else {
              setPaymentStatus({
                type: 'error',
                message:
                  verifyResult.error || 'Payment verification failed. Please contact support.',
              });
              setValue('turnstileToken', '');
              setTurnstileKeyCounter((prev) => prev + 1);
            }
          } catch (err) {
            setPaymentStatus({
              type: 'error',
              message: 'An error occurred verifying payment transaction signature.',
            });
            setValue('turnstileToken', '');
            setTurnstileKeyCounter((prev) => prev + 1);
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: data.studentName,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: '#7C3AED',
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      setPaymentStatus({
        type: 'error',
        message: 'A network error occurred. Please check your internet connection and try again.',
      });
      setValue('turnstileToken', '');
      setTurnstileKeyCounter((prev) => prev + 1);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setPaymentStatus({ type: null, message: '' });
    setTurnstileKeyCounter((prev) => prev + 1);
  };

  return (
    <div className="form-panel w-full rounded-md border border-border bg-card p-6 text-foreground transition-all duration-300 sm:p-8">
      <AnimatePresence mode="wait">
        {paymentStatus.type === 'success' && paymentStatus.receipt ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6 text-center"
          >
            {/* Receipt Header */}
            <div className="space-y-3 py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                Payment Successful
              </h3>
              <p className="mx-auto max-w-md text-sm text-muted-foreground">
                Your payment receipt has been generated. A copy has been sent to your email.
              </p>
            </div>

            {/* Receipt Details Card */}
            <div className="space-y-4 divide-y divide-border rounded-lg border border-border bg-secondary/30 p-5 text-left text-sm text-foreground dark:bg-black/10">
              <div className="flex items-center justify-between pb-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Receipt Number
                  </span>
                  <p className="mt-0.5 font-mono text-base font-bold text-foreground">
                    {paymentStatus.receipt.transactionId}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Date / Time
                  </span>
                  <p className="mt-0.5 font-medium text-foreground">{paymentStatus.receipt.date}</p>
                </div>
              </div>

              <div className="space-y-2 py-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Student Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-foreground/80">
                  <div>
                    <span className="text-muted-foreground">Full Name:</span>{' '}
                    {paymentStatus.receipt.studentName}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Admission ID:</span>{' '}
                    {paymentStatus.receipt.admissionId}
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Class / Grade:</span>{' '}
                    {paymentStatus.receipt.gradeClass}
                  </div>
                </div>
              </div>

              <div className="space-y-2 py-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Payment Info
                </h4>
                <div className="grid grid-cols-2 gap-2 text-foreground/80">
                  <div>
                    <span className="text-muted-foreground">Fee Type:</span>{' '}
                    {paymentStatus.receipt.feeType}
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Amount:</span>{' '}
                    <strong className="text-base text-foreground">
                      INR {paymentStatus.receipt.amount}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Payer Info
                </h4>
                <div className="grid grid-cols-2 gap-2 text-foreground/80">
                  <div>
                    <span className="text-muted-foreground">Parent Name:</span>{' '}
                    {paymentStatus.receipt.parentName}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>{' '}
                    {paymentStatus.receipt.phone}
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Email:</span>{' '}
                    {paymentStatus.receipt.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Print Receipt
              </Button>
              <Button
                onClick={handleReset}
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                Make Another Payment
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(executePaymentSubmit)} className="space-y-6">
                {paymentStatus.type === 'error' && (
                  <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800/30 dark:bg-red-950/20 dark:text-red-400">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                    <p className="text-sm">{paymentStatus.message}</p>
                  </div>
                )}

                {/* Section 1: Student Information */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-2">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
                      <User className="h-5 w-5" /> Student Details
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Identify the student for whom fees are being paid.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="admissionId"
                        className="mb-1 block text-sm font-medium text-foreground"
                      >
                        Admission ID / Roll No *
                      </label>
                      <input
                        id="admissionId"
                        type="text"
                        {...register('admissionId')}
                        placeholder="e.g. GNA-2024-432"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                      />
                      {errors.admissionId && (
                        <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                          {errors.admissionId.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="studentName"
                        className="mb-1 block text-sm font-medium text-foreground"
                      >
                        Student Full Name *
                      </label>
                      <input
                        id="studentName"
                        type="text"
                        {...register('studentName')}
                        placeholder="Enter student's name"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                      />
                      {errors.studentName && (
                        <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                          {errors.studentName.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="gradeClass"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Student Class / Grade *
                    </label>
                    <select
                      id="gradeClass"
                      {...register('gradeClass')}
                      className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                    >
                      {CLASS_OPTIONS.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                    {errors.gradeClass && (
                      <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                        {errors.gradeClass.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Section 2: Fee & Payment details */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-2">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
                      <CreditCard className="h-5 w-5" /> Fee Details
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Specify the fee type and payment amount.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="feeType"
                        className="mb-1 block text-sm font-medium text-foreground"
                      >
                        Fee Component *
                      </label>
                      <select
                        id="feeType"
                        {...register('feeType')}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                      >
                        <option value="Tuition Fee">Tuition Fee</option>
                        <option value="Admission Fee">Admission Fee</option>
                        <option value="Examination Fee">Examination Fee</option>
                        <option value="Transport Fee">Transport Fee</option>
                        <option value="Hostel Fee">Hostel Fee</option>
                        <option value="Miscellaneous Fee">Miscellaneous Fee</option>
                      </select>
                      {errors.feeType && (
                        <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                          {errors.feeType.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="amount"
                        className="mb-1 block text-sm font-medium text-foreground"
                      >
                        Amount (INR) *
                      </label>
                      <input
                        id="amount"
                        type="text"
                        {...register('amount')}
                        placeholder="Enter amount to pay"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                      />
                      {errors.amount && (
                        <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                          {errors.amount.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: Contact/Payer Information */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-2">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
                      <Mail className="h-5 w-5" /> Payer Details
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Enter details for generating payment receipt.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="parentName"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Parent / Guardian Name *
                    </label>
                    <input
                      id="parentName"
                      type="text"
                      {...register('parentName')}
                      placeholder="Enter parent's full name"
                      className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                    />
                    {errors.parentName && (
                      <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                        {errors.parentName.message}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-foreground"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="parent@example.com"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                      />
                      {errors.email && (
                        <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1 block text-sm font-medium text-foreground"
                      >
                        Contact Mobile *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="10-digit mobile number"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                      />
                      {errors.phone && (
                        <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Turnstile Captcha Verification */}
                <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-secondary/15 p-4">
                  <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Verification Check
                  </span>
                  <TurnstileShield
                    key={turnstileKeyCounter}
                    onChallengeSuccess={(token) =>
                      setValue('turnstileToken', token, { shouldValidate: true })
                    }
                    onChallengeExpire={() => setValue('turnstileToken', '')}
                  />
                  {errors.turnstileToken && (
                    <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                      {errors.turnstileToken.message}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <div className="flex justify-end border-t border-border pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !captchaToken}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground shadow-md hover:opacity-90 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Verifying Payment Gateway...
                      </>
                    ) : (
                      <>
                        Proceed to Secure Checkout
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
