import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email: string; password: string };
    const { email, password } = body;

    // Mock authentication - in production, verify against database
    if (email === 'demo@example.com' && password === 'password123') {
      // Create response with redirect
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful',
        redirectTo: '/dashboard'
      });

      // Set secure session cookie
      response.cookies.set('session', 'mock-session-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}