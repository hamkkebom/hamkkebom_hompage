let resendInstance: any = null;

export async function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (resendInstance) return resendInstance;

  try {
    const { Resend } = await import('resend');
    resendInstance = new Resend(process.env.RESEND_API_KEY);
    return resendInstance;
  } catch {
    console.warn('Resend module not available');
    return null;
  }
}
