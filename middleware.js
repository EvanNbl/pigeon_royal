// middleware.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function middleware(req) {
  const cookieStore = await cookies();
  const accessGrantedCookie = cookieStore.get('access_granted');
  const maintenancePath = '/';

  console.log("Accès autorisé ?", accessGrantedCookie);

  console.log("Chemin de la requête :", req.nextUrl.pathname);

  if (!accessGrantedCookie && req.nextUrl.pathname !== maintenancePath) {
    console.log("Redirection vers la maintenance");
    return NextResponse.redirect(new URL(maintenancePath, req.url));
  }

  console.log("Accès autorisé à :", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!load|_next|favicon.ico|api).*)', // Exclut la page de maintenance et les fichiers statiques
};
