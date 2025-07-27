# Next.js SSR on Cloudflare with OpenNext - Example Demo

A complete Next.js application demonstrating **Server-Side Rendering (SSR) deployment on Cloudflare** using the **@opennextjs/cloudflare** adapter. This project serves as the practical example for the article "Deploying Next.js SSR on Cloudflare: The Complete Guide to OpenNext vs next-on-pages".

## 🚀 Why This Example Matters

This demo showcases the **real difference** between deploying Next.js on Cloudflare:
- ❌ **@cloudflare/next-on-pages**: Limited to Edge Runtime only
- ✅ **@opennextjs/cloudflare**: Full Node.js runtime support

## Features Demonstrated

- 🔐 **Dynamic Server Components**: Using `cookies()` and server-side logic
- 🛡️ **Protected Routes**: SSR authentication with session validation
- 🍪 **Node.js APIs**: Full access to Node.js modules (no Edge Runtime limitations)
- 📱 **True SSR**: Server-rendered content on every request
- 🎨 **Dynamic Data**: Real-time user data fetching
- 🔒 **Type Safety**: Complete TypeScript implementation
- ⚡ **Cloudflare Performance**: Sub-50ms response times

## The Problem This Solves

Have you seen these errors when deploying Next.js to Cloudflare?

```
Error: Dynamic server usage: Page couldn't be rendered statically because it used `cookies`.
```

```
Error: The edge runtime does not support Node.js 'fs' module.
```

This example shows how **@opennextjs/cloudflare** eliminates these issues completely.

## Prerequisites

- Node.js 18+ installed
- Cloudflare account (free tier works!)
- Wrangler CLI: `npm install -g wrangler`
- Basic understanding of Next.js App Router

## Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd my-nextjs-app
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
API_URL=http://localhost:3000/api
NEXTJS_ENV=development
```

### 3. Local Development
```bash
npm run dev
```

### 4. Test the SSR Features
- Visit `http://localhost:3000/dashboard`
- Login with: `demo@example.com` / `password123`
- Notice the server-rendered timestamps and dynamic content

## 🔥 Cloudflare Deployment (The Real Deal)

### Option 1: Using Cloudflare CLI (Recommended)
```bash
# Create new Cloudflare project
npm create cloudflare@latest my-nextjs-app -- \
  --framework=next --platform=workers

# Deploy
npm run deploy
```

### Option 2: Manual Setup

1. **Install OpenNext adapter**:
```bash
npm install @opennextjs/cloudflare
```

2. **Configure wrangler.toml**:
```toml
name = "my-nextjs-app"
main = ".open-next/worker.js"
compatibility_date = "2025-01-27"
compatibility_flags = ["nodejs_compat"]

[env.production]
name = "my-nextjs-app-production"
```

3. **Update package.json**:
```json
{
  "scripts": {
    "build": "next build",
    "preview": "opennextjs-cloudflare build && wrangler dev",
    "deploy": "opennextjs-cloudflare build && wrangler deploy"
  }
}
```

4. **Create open-next.config.ts**:
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Optional: Enable R2 for ISR caching
  incrementalCache: {
    type: "r2",
    bucketName: "my-nextjs-cache"
  }
});
```

## 🎯 Key Differences Demonstrated

### ❌ With @cloudflare/next-on-pages
```typescript
// EVERY page needs this
export const runtime = 'edge';

export default async function Page() {
  // ❌ This fails!
  const fs = require('fs');
  
  // ❌ This also fails!
  const crypto = require('crypto');
  
  return <div>Limited functionality</div>;
}
```

### ✅ With @opennextjs/cloudflare
```typescript
// No runtime declaration needed!
export default async function Dashboard() {
  // ✅ Full Node.js support
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session');
  
  // ✅ Dynamic server-side logic
  if (!sessionId) {
    redirect('/login');
  }
  
  // ✅ Real-time data fetching
  const userData = await getUserData(sessionId.value);
  
  return (
    <div>
      <h1>Welcome back, {userData.name}!</h1>
      <p>Rendered at: {new Date().toISOString()}</p>
    </div>
  );
}
```

## 🚨 Common Deployment Mistakes (Avoid These!)

### Mistake #1: Forgetting nodejs_compat
```toml
# ❌ Will cause cryptic errors
compatibility_date = "2025-01-27"

# ✅ Always include this!
compatibility_date = "2025-01-27"
compatibility_flags = ["nodejs_compat"]
```

### Mistake #2: Not Understanding Build Output
After `opennextjs-cloudflare build`:
```
.open-next/
├── worker.js        # Your entire app bundled
├── static/          # Static assets
└── cache/           # ISR cache artifacts
```
**Don't commit `.open-next/` to git!**

### Mistake #3: Wrong Adapter Choice
- Use **@opennextjs/cloudflare** for full Next.js features
- Use **@cloudflare/next-on-pages** only for static/edge-only apps

## 💰 Cloudflare Free Tier Capacity

This example runs perfectly on Cloudflare's free tier:
- **100,000 requests/day** (resets at midnight UTC)
- **10ms CPU time** per request (plenty for SSR)
- **128MB memory** per Worker
- **Unlimited static assets** 🎉

### Real-World Capacity
With optimized SSR pages (~2ms CPU time):
- **~50,000 dynamic page views/day**
- **Unlimited static asset requests**
- **Sub-50ms global response times**

## 📁 Project Structure

```
src/app/
├── api/
│   ├── auth/validate/     # SSR session validation
│   └── users/[id]/        # Dynamic user data
├── dashboard/             # Protected SSR page
├── lib/auth.ts           # Server-side auth logic
├── types/
│   ├── session.ts        # Session interfaces
│   └── user.ts           # User type definitions
└── login/                # Authentication flow
```

## 🧪 Testing the SSR Features

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password123`

### What to Test
1. **Server-Side Rendering**: View page source - HTML is pre-rendered
2. **Dynamic Cookies**: Login persists across page refreshes
3. **Protected Routes**: `/dashboard` redirects when not authenticated
4. **Real-time Data**: Timestamps update on each server request
5. **Node.js APIs**: Full server-side functionality works

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
