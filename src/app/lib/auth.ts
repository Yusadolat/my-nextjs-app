import { cookies } from 'next/headers';
import type { Session } from '@/app/types/session';

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    return null;
  }

  try {
    // Validate session with your auth provider
    const baseUrl = process.env.API_URL || 'http://localhost:3000/api';
    const response = await fetch(`${baseUrl}/auth/validate`, {
      headers: {
        Authorization: `Bearer ${sessionCookie.value}`
      }
    });

    if (!response.ok) {
      return null;
    }

    const session: Session = await response.json();
    return session;
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
}
