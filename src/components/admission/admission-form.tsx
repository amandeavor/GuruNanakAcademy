'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { admissionFormSchema, type AdmissionFormData } from '@/lib/validations';
import { CLASS_OPTIONS } from '@/lib/constants';

export function AdmissionForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: {
      boardingRequired: 'none',
    },
  });

  const onSubmit = async (data: AdmissionFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/admission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message:
            'Your admission application has been submitted successfully. We will contact you soon.',
        });
        reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const classOptions = CLASS_OPTIONS.map((c) => ({ value: c, label: c }));

  const boardingOptions = [
    { value: 'none', label: 'No boarding required' },
    { value: 'boarding', label: 'Boarding (Boys only, Class IV-VIII)' },
    { value: 'dayboarding', label: 'Day-Boarding (Boys & Girls, Class IV-XII)' },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-2xl border border-border bg-card p-6 md:p-8"
      noValidate
    >
      {/* Student Information */}
      <div>
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Student Information
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input
              label="Student's Full Name"
              placeholder="Enter student's full name"
              {...register('studentName')}
              error={errors.studentName?.message}
              required
            />
          </div>
          <Input
            label="Date of Birth"
            type="date"
            {...register('dateOfBirth')}
            error={errors.dateOfBirth?.message}
            required
          />
          <Select
            label="Class Applying For"
            options={classOptions}
            placeholder="Select class"
            {...register('classApplying')}
            error={errors.classApplying?.message}
            required
          />
          <Input
            label="Class Last Attended"
            placeholder="e.g., Class 5"
            {...register('classLastAttended')}
            error={errors.classLastAttended?.message}
          />
          <Input
            label="Previous School Name"
            placeholder="Enter previous school name"
            {...register('previousSchool')}
            error={errors.previousSchool?.message}
          />
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div>
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Parent/Guardian Information
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Father's Name"
            placeholder="Enter father's full name"
            {...register('fatherName')}
            error={errors.fatherName?.message}
            required
          />
          <Input
            label="Mother's Name"
            placeholder="Enter mother's full name"
            {...register('motherName')}
            error={errors.motherName?.message}
            required
          />
          <Input
            label="Contact Number"
            type="tel"
            placeholder="+91 9876543210"
            {...register('contactNumber')}
            error={errors.contactNumber?.message}
            required
          />
          <Input
            label="Alternate Number"
            type="tel"
            placeholder="+91 9876543210"
            {...register('alternateNumber')}
            error={errors.alternateNumber?.message}
          />
          <div className="md:col-span-2">
            <Input
              label="Email Address"
              type="email"
              placeholder="parent@example.com"
              {...register('email')}
              error={errors.email?.message}
              required
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h2 className="mb-6 text-lg font-semibold text-foreground">Address</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Textarea
              label="Complete Address"
              placeholder="House No., Street, Locality"
              {...register('address')}
              error={errors.address?.message}
              required
            />
          </div>
          <Input
            label="City"
            placeholder="Enter city"
            {...register('city')}
            error={errors.city?.message}
            required
          />
          <Input
            label="State"
            placeholder="Enter state"
            {...register('state')}
            error={errors.state?.message}
            required
          />
          <Input
            label="Pincode"
            placeholder="Enter pincode"
            maxLength={6}
            {...register('pincode')}
            error={errors.pincode?.message}
            required
          />
        </div>
      </div>

      {/* Boarding Preference */}
      <div>
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Boarding Preference
        </h2>
        <Select
          label="Boarding Requirement"
          options={boardingOptions}
          {...register('boardingRequired')}
          error={errors.boardingRequired?.message}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Note: Boarding facility is available for boys only (Class IV-VIII).
          Day-boarding is available for both boys and girls (Class IV-XII).
        </p>
      </div>

      {/* Additional Message */}
      <div>
        <Textarea
          label="Additional Message (Optional)"
          placeholder="Any additional information you would like to share..."
          {...register('message')}
          error={errors.message?.message}
        />
      </div>

      {/* Submit Status */}
      {submitStatus.type && (
        <div
          className={`flex items-start gap-3 rounded-lg p-4 ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}
          role="alert"
        >
          {submitStatus.type === 'success' ? (
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          )}
          <p className="text-sm">{submitStatus.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" className="underline hover:text-foreground">
          Terms of Use
        </a>
        .
      </p>
    </form>
  );
}
