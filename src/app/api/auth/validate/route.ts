// app/api/auth/validate/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Mock validation - in production, verify the token
  const token = authHeader.split(' ')[1];

  if (token === 'mock-session-token') {
    return NextResponse.json({
      userId: 'user-123',
      email: 'john@example.com',
      expiresAt: new Date(Date.now() + 3600000).toISOString()
    });
  }

  return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
}
