export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  role: 'admin' | 'user';
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
