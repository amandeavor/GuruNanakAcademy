"use client";

import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { TurnstileShield } from "@/components/shared/turnstile-shield";
import { CLASS_OPTIONS } from "@/lib/constants";
import { Check, Loader2, AlertCircle, CreditCard, User, Mail, Phone, Calendar, ArrowRight, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeePaymentSchema = z.object({
  admissionId: z.string().min(3, "Valid Admission ID or Roll Number is required"),
  studentName: z.string().min(2, "Student full name is required"),
  gradeClass: z.string().min(1, "Select candidate class"),
  feeType: z.enum([
    "Tuition Fee",
    "Admission Fee",
    "Examination Fee",
    "Transport Fee",
    "Hostel Fee",
    "Miscellaneous Fee"
  ]),
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Amount must be a positive number"),
  parentName: z.string().min(2, "Parent/Guardian full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Provide a valid 10-digit mobile number"),
  turnstileToken: z.string().min(1, "CAPTCHA verification is required"),
});

type FeePaymentData = z.infer<typeof FeePaymentSchema>;

export function FeePortalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileKeyCounter, setTurnstileKeyCounter] = useState(0); // To reset widget on error/expire
  const [paymentStatus, setPaymentStatus] = useState<{
    type: "success" | "error" | null;
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
  }>({ type: null, message: "" });

  const formMethods = useForm<FeePaymentData>({
    resolver: zodResolver(FeePaymentSchema),
    mode: "onBlur",
    defaultValues: {
      admissionId: "",
      studentName: "",
      gradeClass: "Class 1",
      feeType: "Tuition Fee",
      amount: "",
      parentName: "",
      email: "",
      phone: "",
      turnstileToken: "",
    }
  });

  const { handleSubmit, setValue, register, formState: { errors }, reset, watch } = formMethods;
  const captchaToken = watch("turnstileToken");

  const executePaymentSubmit = async (data: FeePaymentData) => {
    setIsSubmitting(true);
    setPaymentStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Generate mock transaction receipt details
        const randId = "TXN-" + Math.floor(100000 + Math.random() * 900000);
        const currentDate = new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });

        setPaymentStatus({
          type: "success",
          message: "Payment transaction completed successfully!",
          receipt: {
            transactionId: randId,
            date: currentDate,
            studentName: data.studentName,
            admissionId: data.admissionId,
            gradeClass: data.gradeClass,
            feeType: data.feeType,
            amount: data.amount,
            parentName: data.parentName,
            email: data.email,
            phone: data.phone,
          }
        });
      } else {
        setPaymentStatus({
          type: "error",
          message: result.message || "There was an error verifying the transaction. Please try again.",
        });
        // Reset Captcha token on failure so the user must re-verify
        setValue("turnstileToken", "");
        setTurnstileKeyCounter(prev => prev + 1);
      }
    } catch (error) {
      setPaymentStatus({
        type: "error",
        message: "A network error occurred. Please check your internet connection and try again.",
      });
      setValue("turnstileToken", "");
      setTurnstileKeyCounter(prev => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setPaymentStatus({ type: null, message: "" });
    setTurnstileKeyCounter(prev => prev + 1);
  };

  return (
    <div className="w-full bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-border text-foreground transition-all duration-300">

      <AnimatePresence mode="wait">
        {paymentStatus.type === "success" && paymentStatus.receipt ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6 text-center"
          >
            {/* Receipt Header */}
            <div className="py-4 space-y-3">
              <div className="mx-auto h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Payment Successful</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">Your payment receipt has been generated. A copy has been sent to your email.</p>
            </div>

            {/* Receipt Details Card */}
            <div className="bg-secondary/30 dark:bg-black/10 border border-border rounded-lg p-5 text-left text-sm divide-y divide-border text-foreground space-y-4">
              <div className="pb-3 flex justify-between items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Receipt Number</span>
                  <p className="font-mono text-base font-bold text-foreground mt-0.5">{paymentStatus.receipt.transactionId}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date / Time</span>
                  <p className="font-medium text-foreground mt-0.5">{paymentStatus.receipt.date}</p>
                </div>
              </div>

              <div className="py-3 space-y-2">
                <h4 className="font-bold text-primary text-xs uppercase tracking-wider">Student Details</h4>
                <div className="grid grid-cols-2 gap-2 text-foreground/80">
                  <div><span className="text-muted-foreground">Full Name:</span> {paymentStatus.receipt.studentName}</div>
                  <div><span className="text-muted-foreground">Admission ID:</span> {paymentStatus.receipt.admissionId}</div>
                  <div className="col-span-2"><span className="text-muted-foreground">Class / Grade:</span> {paymentStatus.receipt.gradeClass}</div>
                </div>
              </div>

              <div className="py-3 space-y-2">
                <h4 className="font-bold text-primary text-xs uppercase tracking-wider">Payment Info</h4>
                <div className="grid grid-cols-2 gap-2 text-foreground/80">
                  <div><span className="text-muted-foreground">Fee Type:</span> {paymentStatus.receipt.feeType}</div>
                  <div className="text-right"><span className="text-muted-foreground">Amount:</span> <strong className="text-foreground text-base">INR {paymentStatus.receipt.amount}</strong></div>
                </div>
              </div>

              <div className="pt-3 space-y-2">
                <h4 className="font-bold text-primary text-xs uppercase tracking-wider">Payer Info</h4>
                <div className="grid grid-cols-2 gap-2 text-foreground/80">
                  <div><span className="text-muted-foreground">Parent Name:</span> {paymentStatus.receipt.parentName}</div>
                  <div><span className="text-muted-foreground">Phone:</span> {paymentStatus.receipt.phone}</div>
                  <div className="col-span-2"><span className="text-muted-foreground">Email:</span> {paymentStatus.receipt.email}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <Button onClick={() => window.print()} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Print Receipt
              </Button>
              <Button onClick={handleReset} className="bg-primary text-primary-foreground hover:opacity-90">
                Make Another Payment
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(executePaymentSubmit)} className="space-y-6">

                {paymentStatus.type === "error" && (
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 text-red-800 dark:text-red-400 p-4 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{paymentStatus.message}</p>
                  </div>
                )}

                {/* Section 1: Student Information */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-2">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                      <User className="h-5 w-5" /> Student Details
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Identify the student for whom fees are being paid.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1">
                        Admission ID / Roll No *
                      </label>
                      <input
                        type="text"
                        {...register("admissionId")}
                        placeholder="e.g. GNA-2024-432"
                        className="w-full p-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground shadow-sm outline-none text-sm transition-all"
                      />
                      {errors.admissionId && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.admissionId.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("studentName")}
                        placeholder="Enter student's name"
                        className="w-full p-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground shadow-sm outline-none text-sm transition-all"
                      />
                      {errors.studentName && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.studentName.message}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1">
                      Student Class / Grade *
                    </label>
                    <select
                      {...register("gradeClass")}
                      className="w-full p-2.5 border border-border rounded-lg bg-background text-foreground shadow-sm outline-none text-sm focus:ring-2 focus:ring-primary transition-all"
                    >
                      {CLASS_OPTIONS.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                    {errors.gradeClass && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.gradeClass.message}</span>}
                  </div>
                </div>

                {/* Section 2: Fee & Payment details */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-2">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                      <CreditCard className="h-5 w-5" /> Fee Details
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Specify the fee type and payment amount.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1">
                        Fee Component *
                      </label>
                      <select
                        {...register("feeType")}
                        className="w-full p-2.5 border border-border rounded-lg bg-background text-foreground shadow-sm outline-none text-sm focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value="Tuition Fee">Tuition Fee</option>
                        <option value="Admission Fee">Admission Fee</option>
                        <option value="Examination Fee">Examination Fee</option>
                        <option value="Transport Fee">Transport Fee</option>
                        <option value="Hostel Fee">Hostel Fee</option>
                        <option value="Miscellaneous Fee">Miscellaneous Fee</option>
                      </select>
                      {errors.feeType && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.feeType.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1">
                        Amount (INR) *
                      </label>
                      <input
                        type="text"
                        {...register("amount")}
                        placeholder="Enter amount to pay"
                        className="w-full p-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground shadow-sm outline-none text-sm transition-all"
                      />
                      {errors.amount && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.amount.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Section 3: Contact/Payer Information */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-2">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                      <Mail className="h-5 w-5" /> Payer Details
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Enter details for generating payment receipt.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      {...register("parentName")}
                      placeholder="Enter parent's full name"
                      className="w-full p-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground shadow-sm outline-none text-sm transition-all"
                    />
                    {errors.parentName && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.parentName.message}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="parent@example.com"
                        className="w-full p-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground shadow-sm outline-none text-sm transition-all"
                      />
                      {errors.email && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-1">
                        Contact Mobile *
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="10-digit mobile number"
                        className="w-full p-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground shadow-sm outline-none text-sm transition-all"
                      />
                      {errors.phone && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Turnstile Captcha Verification */}
                <div className="border border-dashed border-border rounded-lg p-4 bg-secondary/15 flex flex-col items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Bot Prevention Security Check
                  </span>
                  <TurnstileShield
                    key={turnstileKeyCounter}
                    onChallengeSuccess={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
                    onChallengeExpire={() => setValue("turnstileToken", "")}
                  />
                  {errors.turnstileToken && <span className="text-red-600 dark:text-red-400 text-xs mt-1 block">{errors.turnstileToken.message}</span>}
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-border flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !captchaToken}
                    className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 font-bold shadow-md flex items-center justify-center gap-2"
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
