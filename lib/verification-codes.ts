// Store verification codes temporarily
// In production, use Redis or database with expiration
export const verificationCodes = new Map<string, { code: string; expires: number }>();
