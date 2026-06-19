const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstileToken(token: string): Promise<{ success: boolean; error?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    // In dev without secret configured, skip verification
    if (process.env.NODE_ENV === 'development') {
      return { success: true };
    }
    return { success: false, error: 'CAPTCHA configuration missing' };
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });

    if (!res.ok) {
      return { success: false, error: 'CAPTCHA verification service unavailable' };
    }

    const data = await res.json() as { success: boolean; 'error-codes'?: string[] };
    if (!data.success) {
      return { success: false, error: 'CAPTCHA verification failed' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'CAPTCHA verification network error' };
  }
}
