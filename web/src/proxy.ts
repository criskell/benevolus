import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/auth/')) {
    const isPageRequest =
      request.method === 'GET' &&
      request.headers.get('accept')?.includes('text/html');

    if (!isPageRequest) {
      const url = new URL(pathname + request.nextUrl.search, API_URL);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*'],
};
