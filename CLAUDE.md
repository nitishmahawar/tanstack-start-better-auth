# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `pnpm install` (runs Prisma generate automatically)
- **Start development server**: `pnpm dev` (runs on port 3000)
- **Build for production**: `pnpm build`
- **Run tests**: `pnpm test` (uses Vitest)
- **Run tests in watch mode**: `pnpm test --watch`
- **Preview production build**: `pnpm serve`
- **Generate Prisma client**: `pnpm prisma generate`
- **Run database migrations**: `pnpm prisma migrate dev`

## Project Architecture

This is a **TanStack Start** application with **Better Auth** authentication system, built with:

### Core Stack
- **TanStack Start**: Full-stack React framework with file-based routing
- **Better Auth**: Authentication system with email/password and Google OAuth
- **Prisma**: ORM with PostgreSQL database
- **Tailwind CSS**: Styling with Shadcn UI components
- **ORPC**: Type-safe RPC client/server communication
- **TanStack Query**: Data fetching and caching

### Key Directories Structure

- `src/routes/`: File-based routing system
  - `__root.tsx`: Root layout with devtools, query client context, and session handling
  - `(auth)/`: Authentication routes (sign-in, sign-up) with auth layout
  - `api.*.ts`: API route handlers (auth, RPC)
- `src/lib/`: Core business logic
  - `auth.ts`: Better Auth server configuration
  - `auth-client.tsx`: Client-side auth utilities
  - `prisma.ts`: Prisma client instance
  - `env.ts`: Type-safe environment variables
- `src/components/`: React components
  - `ui/`: Shadcn UI components (sonner, button, input, etc.)
  - `header.tsx`, `user-menu.tsx`: Layout components with auth integration
- `src/integrations/tanstack-query/`: TanStack Query setup with DevTools
- `prisma/`: Database schema and migrations

### Authentication System
- Uses Better Auth with Prisma adapter
- Supports email/password and Google OAuth
- Auth routes: `/api/auth/*` handle server-side auth
- Client auth configured in `src/lib/auth-client.tsx`
- Database includes User, Session, Account, and Verification models
- Session management handled via React Start cookies plugin

### Routing Architecture
- File-based routing via TanStack Router with TypeScript
- Route groups using parentheses: `(auth)` for auth layouts
- API routes using `api.` prefix pattern
- Root route provides QueryClient context via `MyRouterContext`
- Session management handled in root route `beforeLoad` with server function

### Environment Configuration
- Uses `@t3-oss/env-core` for type-safe environment variables
- Server variables defined in `src/env.ts`
- Client variables must use `VITE_` prefix

### Database Schema
- User model with authentication fields and relationships (name, email, image)
- Session model with token-based auth, IP tracking, and user agent
- Account model for OAuth providers (Google, etc.)
- Verification model for email verification flows
- Example model: Note (user content with foreign key)

### Development Notes
- Devtools integrated: TanStack Router, Query, and React Devtools
- Path aliases configured: `@/*` maps to `./src/*`
- Component library: Shadcn UI (latest version)
- Use `pnpx shadcn@latest add [component]` to add new components
- TypeScript with strict configuration
- Environment variables: Server vars in `src/env.ts`, client vars with `VITE_` prefix
- Database: PostgreSQL with Prisma ORM
- Deployment: Configured for Vercel via Nitro v2 plugin