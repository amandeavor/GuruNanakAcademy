'use client';

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { secureDocumentUpload } from '@/app/actions/secureDocumentUpload';
import {
  Check,
  Loader2,
  Upload,
  AlertCircle,
  Calendar,
  GraduationCap,
  User,
  Phone,
  Home,
  FileText,
} from 'lucide-react';

const StudentProfileSchema = z
  .object({
    candidateName: z.string().min(2, 'Candidate full name is required'),
    birthDate: z.string().refine((dateString) => {
      if (!dateString) return false;
      const parsedDate = new Date(dateString);
      const targetDate = new Date('2026-03-31'); // Academic verification target

      let calculatedAge = targetDate.getFullYear() - parsedDate.getFullYear();
      const monthDiff = targetDate.getMonth() - parsedDate.getMonth();
      const dayDiff = targetDate.getDate() - parsedDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        calculatedAge--;
      }
      return calculatedAge >= 3;
    }, 'Candidate must be at least 3 years of age as of March 31, 2026'),
    academicStandard: z.enum([
      'Play Group',
      'Kindergarten',
      'Class I',
      'Class IX',
      'Class XI-Science',
      'Class XI-Commerce',
    ]),
    eleventhSubjectStream: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.academicStandard === 'Class XI-Science' && !data.eleventhSubjectStream) {
        return false;
      }
      return true;
    },
    {
      message: 'Science elective choice is required',
      path: ['eleventhSubjectStream'],
    }
  );

const ParentProfileSchema = z.object({
  fatherFullName: z.string().min(2, "Father's name is required"),
  motherFullName: z.string().min(2, "Mother's name is required"),
  contactPhone: z.string().regex(/^[6-9]\d{9}$/, 'Provide a valid 10-digit mobile number'),
  residenceAddress: z.string().min(10, 'Provide a complete residential address'),
  documentUrl: z.string().min(1, 'Academic record upload is required'),
});

const WizardSchema = StudentProfileSchema.and(ParentProfileSchema);
type WizardData = z.infer<typeof WizardSchema>;

const wizardSteps = [
  {
    id: 'candidate',
    title: 'Candidate',
    fields: ['candidateName', 'birthDate', 'academicStandard', 'eleventhSubjectStream'],
  },
  {
    id: 'parent',
    title: 'Parent & Document',
    fields: ['fatherFullName', 'motherFullName', 'contactPhone', 'residenceAddress', 'documentUrl'],
  },
  { id: 'review', title: 'Review', fields: [] },
];

export function AdmissionsWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStepId = searchParams.get('step') || 'candidate';

  const activeStepIndex = wizardSteps.findIndex((step) => step.id === activeStepId);
  const currentStep = activeStepIndex === -1 ? 0 : activeStepIndex;

  const [uploadState, setUploadState] = useState({
    uploading: false,
    error: '',
    success: false,
    fileName: '',
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const formMethods = useForm<WizardData>({
    resolver: zodResolver(WizardSchema),
    mode: 'onBlur',
    defaultValues: {
      candidateName: '',
      birthDate: '',
      academicStandard: 'Play Group',
      eleventhSubjectStream: '',
      fatherFullName: '',
      motherFullName: '',
      contactPhone: '',
      residenceAddress: '',
      documentUrl: '',
    },
  });

  const { trigger, handleSubmit, watch, register } = formMethods;

  const setStepInUrl = (stepId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('step', stepId);
    router.push(`?${params.toString()}`);
  };

  const handleNextStep = async () => {
    const activeStepFields = wizardSteps[currentStep].fields as (keyof WizardData)[];
    const isStepValid = await trigger(activeStepFields);
    if (isStepValid && currentStep < wizardSteps.length - 1) {
      setStepInUrl(wizardSteps[currentStep + 1].id);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setStepInUrl(wizardSteps[currentStep - 1].id);
    }
  };

  const executeFormSubmit = async (data: WizardData) => {
    setSubmitStatus({ type: null, message: '' });
    try {
      const response = await fetch('/api/admission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: data.candidateName,
          dateOfBirth: data.birthDate,
          classApplying: data.academicStandard,
          classLastAttended: data.eleventhSubjectStream || '',
          previousSchool: 'Submitted via AdmissionsWizard',
          fatherName: data.fatherFullName,
          motherName: data.motherFullName,
          contactNumber: data.contactPhone,
          email: 'parent@example.com', // default or generic for backend consistency
          address: data.residenceAddress,
          city: 'Dehradun',
          state: 'Uttarakhand',
          pincode: '248001',
          boardingRequired: 'none',
          message: `Academic Record Uploaded: ${data.documentUrl}`,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message:
            'Your application has been successfully submitted! We will review the documents and contact you soon.',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'There was an error submitting the form. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'A network error occurred. Please check your connection and try again.',
      });
    }
  };

  return (
    <div className="form-panel mx-auto w-full max-w-2xl rounded-md border border-border bg-card p-6 text-foreground transition-all duration-300 sm:p-8">
      {/* Step Indicator */}
      <div className="relative mb-8 flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 z-0 h-[2px] -translate-y-1/2 bg-border" />
        {wizardSteps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (idx < currentStep) setStepInUrl(step.id);
                }}
                disabled={idx > currentStep}
                aria-label={`Step ${idx + 1}: ${step.title}`}
                aria-current={isActive ? 'step' : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'cursor-pointer border-primary bg-primary text-primary-foreground hover:opacity-90'
                    : isActive
                      ? 'border-primary bg-primary text-primary-foreground shadow-md'
                      : 'cursor-not-allowed border-border bg-secondary text-muted-foreground'
                }`}
              >
                {isCompleted ? <Check className="h-5 w-5 stroke-[2.5]" /> : idx + 1}
              </button>
              <span
                className={`mt-2 hidden text-xs font-semibold uppercase tracking-wider sm:block ${
                  isActive ? 'font-bold text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {submitStatus.type === 'success' ? (
        <div className="space-y-4 py-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="h-8 w-8 stroke-[3]" />
          </div>
          <h3 className="text-2xl font-bold text-primary">Submission Successful</h3>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">{submitStatus.message}</p>
        </div>
      ) : (
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(executeFormSubmit)} className="space-y-6">
            {submitStatus.type === 'error' && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800/30 dark:bg-red-950/20 dark:text-red-400">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepId}
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -15, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeStepId === 'candidate' && <CandidateStepView />}
                {activeStepId === 'parent' && (
                  <ParentStepView
                    onUploadStart={() =>
                      setUploadState({ uploading: true, error: '', success: false, fileName: '' })
                    }
                    onUploadSuccess={(url) =>
                      setUploadState({
                        uploading: false,
                        error: '',
                        success: true,
                        fileName: 'File Uploaded Successfully',
                      })
                    }
                    onUploadError={(err) =>
                      setUploadState({ uploading: false, error: err, success: false, fileName: '' })
                    }
                    uploadState={uploadState}
                  />
                )}
                {activeStepId === 'review' && <ReviewStepView />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between border-t border-border pt-6">
              <button
                type="button"
                onClick={handlePreviousStep}
                className={`rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted/40 ${
                  currentStep === 0 ? 'invisible' : 'opacity-100'
                }`}
              >
                Back
              </button>

              {currentStep < wizardSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

function CandidateStepView() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WizardData>();
  const selectedStandard = watch('academicStandard');

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-2">
        <h3 className="flex items-center gap-2 text-xl font-medium text-foreground">
          <GraduationCap className="h-6 w-6" /> Candidate Information
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Provide details of the prospective student.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="candidateName" className="mb-1 block text-sm font-medium text-foreground">
            Candidate Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              id="candidateName"
              type="text"
              {...register('candidateName')}
              placeholder="Enter candidate's full name"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.candidateName && (
            <span className="mt-1 block text-xs text-red-600">{errors.candidateName.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="birthDate" className="mb-1 block text-sm font-medium text-foreground">
            Date of Birth *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              id="birthDate"
              type="date"
              {...register('birthDate')}
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.birthDate && (
            <span className="mt-1 block text-xs text-red-600">{errors.birthDate.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="academicStandard"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Admission Target Grade *
          </label>
          <select
            id="academicStandard"
            {...register('academicStandard')}
            className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Play Group">Play Group (Ages 3+ as of Mar 31)</option>
            <option value="Kindergarten">Kindergarten (Ages 4+ as of Mar 31)</option>
            <option value="Class I">Class I (Ages 5+ as of Mar 31)</option>
            <option value="Class IX">Class IX</option>
            <option value="Class XI-Science">Class XI - Science</option>
            <option value="Class XI-Commerce">Class XI - Commerce</option>
          </select>
        </div>

        {selectedStandard === 'Class XI-Science' && (
          <div>
            <label
              htmlFor="eleventhSubjectStream"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Select Science Elective *
            </label>
            <select
              id="eleventhSubjectStream"
              {...register('eleventhSubjectStream')}
              className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Choose Subject Stream --</option>
              <option value="PCM">Physics + Chemistry + Mathematics</option>
              <option value="PCB">Physics + Chemistry + Biology</option>
            </select>
            {errors.eleventhSubjectStream && (
              <span className="mt-1 block text-xs text-red-600">
                {errors.eleventhSubjectStream.message}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ParentStepView({
  onUploadStart,
  onUploadSuccess,
  onUploadError,
  uploadState,
}: {
  onUploadStart: () => void;
  onUploadSuccess: (url: string) => void;
  onUploadError: (err: string) => void;
  uploadState: { uploading: boolean; error: string; success: boolean; fileName: string };
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<WizardData>();
  const uploadedUrl = watch('documentUrl');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onUploadStart();
    setValue('documentUrl', '', { shouldValidate: true });

    const formData = new FormData();
    formData.append('academicRecord', file);

    try {
      const res = await secureDocumentUpload(formData);
      if (res.success && res.fileLocation) {
        onUploadSuccess(res.fileLocation);
        setValue('documentUrl', res.fileLocation, { shouldValidate: true });
      } else {
        onUploadError(res.errorMessage || 'Failed to upload file.');
      }
    } catch (err) {
      onUploadError('An unexpected error occurred during upload.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-2">
        <h3 className="flex items-center gap-2 text-xl font-medium text-foreground">
          <User className="h-6 w-6" /> Parent/Guardian Details & Records
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Provide background information and academic records.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fatherFullName"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Father's Full Name *
            </label>
            <input
              id="fatherFullName"
              type="text"
              {...register('fatherFullName')}
              placeholder="Enter father's name"
              className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.fatherFullName && (
              <span className="mt-1 block text-xs text-red-600">
                {errors.fatherFullName.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="motherFullName"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Mother's Full Name *
            </label>
            <input
              id="motherFullName"
              type="text"
              {...register('motherFullName')}
              placeholder="Enter mother's name"
              className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.motherFullName && (
              <span className="mt-1 block text-xs text-red-600">
                {errors.motherFullName.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contactPhone" className="mb-1 block text-sm font-medium text-foreground">
            Contact Telephone (10-Digit Mobile) *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              id="contactPhone"
              type="tel"
              {...register('contactPhone')}
              placeholder="9876543210"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.contactPhone && (
            <span className="mt-1 block text-xs text-red-600">{errors.contactPhone.message}</span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Complete Residential Address *
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <textarea
              {...register('residenceAddress')}
              placeholder="Enter complete residential address"
              className="h-20 w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.residenceAddress && (
            <span className="mt-1 block text-xs text-red-600">
              {errors.residenceAddress.message}
            </span>
          )}
        </div>

        <div className="relative rounded-lg border border-dashed border-border bg-secondary/30 p-5">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Academic Record Upload (Report Card/Birth Certificate) *
          </label>
          <p className="mb-3 text-xs text-muted-foreground">
            Only PDF, PNG, or JPEG format (Max 5MB).
          </p>

          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:opacity-90">
              <Upload className="h-4 w-4" /> Choose File
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {uploadState.uploading && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" /> Uploading to secure
                storage...
              </span>
            )}

            {uploadedUrl && !uploadState.uploading && (
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <Check className="h-4 w-4 stroke-[3]" /> Uploaded successfully
              </span>
            )}
          </div>

          {uploadState.error && (
            <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" /> {uploadState.error}
            </div>
          )}
          {errors.documentUrl && (
            <span className="mt-1 block text-xs text-red-600">{errors.documentUrl.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewStepView() {
  const { getValues } = useFormContext<WizardData>();
  const values = getValues();

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-2">
        <h3 className="flex items-center gap-2 text-xl font-medium text-foreground">
          <FileText className="h-6 w-6" /> Form Verification
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Review your details before final submission.
        </p>
      </div>

      <div className="space-y-4 divide-y divide-border rounded-lg border border-border bg-secondary/30 p-5 text-sm text-foreground shadow-sm dark:bg-black/10">
        <div className="pb-3">
          <h4 className="mb-2 font-bold text-forest dark:text-gold">Candidate Details</h4>
          <div className="grid grid-cols-2 gap-2 text-foreground/80">
            <div>
              <span className="font-semibold text-muted-foreground">Full Name:</span>{' '}
              {values.candidateName}
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Date of Birth:</span>{' '}
              {values.birthDate}
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Target Class:</span>{' '}
              {values.academicStandard}
            </div>
            {values.eleventhSubjectStream && (
              <div>
                <span className="font-semibold text-muted-foreground">Stream:</span>{' '}
                {values.eleventhSubjectStream}
              </div>
            )}
          </div>
        </div>

        <div className="pb-3 pt-3">
          <h4 className="mb-2 font-bold text-forest dark:text-gold">Parent/Guardian Info</h4>
          <div className="grid grid-cols-2 gap-2 text-foreground/80">
            <div>
              <span className="font-semibold text-muted-foreground">Father's Name:</span>{' '}
              {values.fatherFullName}
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Mother's Name:</span>{' '}
              {values.motherFullName}
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-muted-foreground">Phone:</span>{' '}
              {values.contactPhone}
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-muted-foreground">Address:</span>{' '}
              {values.residenceAddress}
            </div>
          </div>
        </div>

        <div className="pt-3">
          <h4 className="mb-2 font-bold text-forest dark:text-gold">Uploaded Document</h4>
          <div className="flex items-center gap-2 break-all rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            <Check className="h-4 w-4 flex-shrink-0 stroke-[3]" />
            <span>Academic record uploaded: {values.documentUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
