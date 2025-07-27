import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import type { User, ApiResponse } from '@/app/types/user';
import { getSession } from '@/app/lib/auth';

async function getUserData(userId: string): Promise<User | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL || 'https://api.example.com'}/users/${userId}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }

    const result: ApiResponse<User> = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Loading component
function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
}

// Stats component
function UserStats({ stats }: { stats: User['stats'] }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-2xl font-bold">{stats.posts}</div>
        <div className="text-gray-500">Posts</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-2xl font-bold">{stats.followers}</div>
        <div className="text-gray-500">Followers</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-2xl font-bold">{stats.following}</div>
        <div className="text-gray-500">Following</div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  // Check authentication
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch user data
  const userData = await getUserData(session.userId);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error loading dashboard
          </h1>
          <p className="text-gray-600 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // Format dates
  const lastLogin = new Date(userData.lastLogin).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const currentTime = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<DashboardSkeleton />}>
          {/* Header */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-gray-600 mt-2">Last login: {lastLogin}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                Role: <span className="font-medium">{userData.role}</span>
              </p>
              <p>
                Email: <span className="font-medium">{userData.email}</span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <UserStats stats={userData.stats} />

          {/* Server render time */}
          <div className="mt-8 text-center text-sm text-gray-400">
            Page rendered on server at: {currentTime}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
