// middleware.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function middleware(req) {
  const cookieStore = await cookies();
  const accessGrantedCookie = cookieStore.get('access_granted');
  const maintenancePath = '/';

  if (!accessGrantedCookie && req.nextUrl.pathname !== maintenancePath) {
    return NextResponse.redirect(new URL(maintenancePath, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!load|_next|favicon.ico|api).*)',
};
