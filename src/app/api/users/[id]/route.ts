import { NextResponse } from 'next/server';
import type { User } from '@/app/types/user';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await params before using
  const { id } = await params;
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock user data
  const mockUser: User = {
    id: id,
    name: 'Yusuf King',
    email: 'yking@example.com',
    lastLogin: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    role: 'admin',
    stats: {
      posts: 42,
      followers: 1234,
      following: 567
    }
  };

  return NextResponse.json({ data: mockUser });
}
