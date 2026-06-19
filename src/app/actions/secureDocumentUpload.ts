"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const isAwsConfigured =
  !!(process.env.AWS_REGION &&
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_S3_BUCKET_NAME);

const secureS3Client = isAwsConfigured
  ? new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })
  : null;

interface UploadResponse {
  success: boolean;
  fileLocation?: string;
  errorMessage?: string;
}

// Map valid magic bytes for verification
const VALID_MAGIC_BYTES: Record<string, string> = {
  "25504446": "application/pdf",
  "89504e47": "image/png",
  "ffd8ffe0": "image/jpeg",
  "ffd8ffe1": "image/jpeg",
  "ffd8ffe2": "image/jpeg",
};

export async function secureDocumentUpload(formPayload: FormData): Promise<UploadResponse> {
  try {
    const targetFile = formPayload.get("academicRecord") as File;
    if (!targetFile) {
      return { success: false, errorMessage: "No document detected." };
    }

    const payloadBuffer = Buffer.from(await targetFile.arrayBuffer());

    // Verify file type using binary magic bytes to prevent upload exploits
    const hexHeader = payloadBuffer.toString("hex", 0, 4);
    const verifiedMimeType = VALID_MAGIC_BYTES[hexHeader];

    if (!verifiedMimeType) {
      return { success: false, errorMessage: "Invalid file format detected. Only PDF, PNG, and JPEG are allowed." };
    }

    const maxLimitSize = 5 * 1024 * 1024; // 5MB limit
    if (payloadBuffer.byteLength > maxLimitSize) {
      return { success: false, errorMessage: "File size exceeds the 5MB limit." };
    }

    const secureStorageKey = `admissions-intake/2026/${crypto.randomUUID()}-${targetFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    if (secureS3Client && isAwsConfigured) {
      const putCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: secureStorageKey,
        Body: payloadBuffer,
        ContentType: verifiedMimeType,
        Metadata: {
          classification: "applicant-documentation",
        },
      });

      await secureS3Client.send(putCommand);
      const assetUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${secureStorageKey}`;

      return { success: true, fileLocation: assetUrl };
    } else {
      // Fallback/Mock behavior for local testing
      console.warn("AWS S3 environment variables not configured. Falling back to local mock upload.");
      const mockUrl = `/uploads/${secureStorageKey}`;
      return { success: true, fileLocation: mockUrl };
    }
  } catch (err) {
    console.error("Document upload failure:", err);
    return { success: false, errorMessage: "Internal storage delivery failure." };
  }
}
