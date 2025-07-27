# Next.js Authentication Example

This is a [Next.js](https://nextjs.org) project demonstrating authentication, session management, and protected routes. This example was built as a demonstration for an article on building secure Next.js applications.

## Features

- 🔐 Session-based authentication
- 🛡️ Protected dashboard route
- 🍪 Cookie-based session management
- 📱 Responsive UI with Tailwind CSS
- 🔄 Server-side rendering with data fetching
- ⚡ Built with Next.js 15 and TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-nextjs-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
   - The project includes `.env.local` and `.dev.vars` files for development
   - For production, set `API_URL` to your actual API endpoint

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing the Application

### Login Flow

1. **Access the Login Page**:
   - Navigate to [http://localhost:3000/login](http://localhost:3000/login)
   - The form is pre-filled with demo credentials for easy testing

2. **Demo Credentials**:
   - **Email**: `demo@example.com`
   - **Password**: `password`
   - These are pre-filled in the form for convenience

3. **Login Process**:
   - Click "Sign in" button
   - The app will simulate authentication and set a session cookie
   - You'll be redirected to the dashboard automatically

4. **Dashboard Access**:
   - Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
   - You should see user information, stats, and last login time
   - If not logged in, you'll be redirected to the login page

### Testing Protected Routes

- Try accessing `/dashboard` without logging in first
- You should be automatically redirected to `/login`
- After logging in, you should be able to access the dashboard

### Session Management

- The session is stored as a cookie named `session`
- Session validation happens on each protected route access
- To test logout, clear your browser cookies or use developer tools

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/validate/     # Session validation endpoint
│   │   └── users/[id]/        # User data API
│   ├── dashboard/             # Protected dashboard page
│   ├── login/                 # Login page
│   ├── lib/
│   │   └── auth.ts           # Authentication utilities
│   └── types/
│       ├── user.ts           # User type definitions
│       └── session.ts        # Session type definitions
```

## API Endpoints

- `GET /api/auth/validate` - Validates session tokens
- `GET /api/users/[id]` - Fetches user data by ID

## Environment Variables

- `API_URL` - Base URL for API calls (defaults to `http://localhost:3000/api`)
- `NEXTJS_ENV` - Environment identifier

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Custom session-based auth
- **Deployment**: Cloudflare Workers (configured)

## Development Notes

This is a demonstration project showing:
- How to implement authentication in Next.js 15
- Server-side session validation
- Protected routes and redirects
- TypeScript integration
- Modern React patterns with Server Components

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication) - authentication patterns
- [TypeScript](https://www.typescriptlang.org/docs/) - TypeScript documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework

## Deployment

This project is configured for deployment on Cloudflare Workers using OpenNext:

```bash
npm run deploy
```

For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
