// Configuration for production environment
export const config = {
  // Base URL for the application
  baseUrl: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  
  // Check if running in production
  isProduction: process.env.NODE_ENV === 'production',
  
  // Database path
  dbPath: process.env.DATABASE_PATH || './data/contacts.db',
  
  // Upload directory
  uploadDir: process.env.UPLOAD_DIR || './public/uploads',
  
  // SMTP Configuration
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.SMTP_FROM || '',
    to: process.env.SMTP_TO || '',
  },
  
  // Admin configuration
  admin: {
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
};

// Helper to get full URL for images
export function getFullImageUrl(path: string): string {
  if (!path) return '';
  
  // If already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If starts with /, prepend base URL
  if (path.startsWith('/')) {
    return `${config.baseUrl}${path}`;
  }
  
  // Otherwise, prepend base URL with /
  return `${config.baseUrl}/${path}`;
}
