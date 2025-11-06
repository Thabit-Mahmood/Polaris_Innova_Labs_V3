import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle image requests from /uploads/ path
  if (pathname.startsWith('/uploads/')) {
    try {
      const filename = pathname.replace('/uploads/', '');
      const filepath = path.join(process.cwd(), 'data', 'uploads', filename);

      if (existsSync(filepath)) {
        const imageBuffer = await readFile(filepath);
        
        // Determine content type
        const ext = path.extname(filename).toLowerCase();
        const contentTypeMap: { [key: string]: string } = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.webp': 'image/webp',
        };
        
        const contentType = contentTypeMap[ext] || 'image/jpeg';

        return new NextResponse(imageBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    } catch (error) {
      console.error('Image serve error:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/uploads/:path*',
};
