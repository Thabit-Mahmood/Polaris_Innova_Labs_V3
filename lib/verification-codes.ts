// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expires: number }>();

export function setVerificationCode(email: string, code: string, expires: number) {
  verificationCodes.set(email, { code, expires });
}

export function getVerificationCode(email: string) {
  return verificationCodes.get(email);
}

export function deleteVerificationCode(email: string) {
  verificationCodes.delete(email);
}
