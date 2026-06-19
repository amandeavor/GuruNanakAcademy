"use server";

interface TurnstilePayload {
  success: boolean;
  "error-codes"?: string[];
}

export async function submitInquiryAction(captchaToken: string, payloadData: any): Promise<{ success: boolean; error?: string }> {
  const siteVerifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x00000000000000000000000000000000AA"; // Fallback to always-pass secret key

  try {
    const challengeResponse = await fetch(siteVerifyEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(captchaToken)}`,
    });

    const verificationPayload: TurnstilePayload = await challengeResponse.json();

    if (!verificationPayload.success) {
      return { success: false, error: "Spam verification failed. Please try again." };
    }

    // Process inquiry data (e.g., save in database or send email)
    console.log("Verified Turnstile challenge successfully. Processing data:", payloadData);

    return { success: true };
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return { success: false, error: "Verification server is currently unavailable." };
  }
}
