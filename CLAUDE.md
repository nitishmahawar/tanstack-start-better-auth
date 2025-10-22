# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `pnpm install`
- **Start development server**: `pnpm dev` (runs on port 3000)
- **Build for production**: `pnpm build`
- **Run tests**: `pnpm test` (uses Vitest)
- **Preview production build**: `pnpm serve`

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
  - `__root.tsx`: Root layout with devtools and query client context
  - `(auth)/`: Authentication routes (sign-in, sign-up)
  - `api.*.ts`: API route handlers (auth, RPC)
- `src/lib/`: Core business logic
  - `auth.ts`: Better Auth server configuration
  - `auth-client.tsx`: Client-side auth utilities
  - `prisma.ts`: Prisma client instance
- `src/components/`: React components
  - `ui/`: Shadcn UI components
  - `header.tsx`, `user-menu.tsx`: Layout components
- `src/integrations/tanstack-query/`: TanStack Query setup
- `prisma/`: Database schema and migrations

### Authentication System
- Uses Better Auth with Prisma adapter
- Supports email/password and Google OAuth
- Auth routes: `/api/auth/*` handle server-side auth
- Client auth configured in `src/lib/auth-client.tsx`
- Database includes User, Session, Account, and Verification models

### Routing Architecture
- File-based routing via TanStack Router
- Route groups using parentheses: `(auth)` for auth layouts
- API routes using `api.` prefix pattern
- Root route provides QueryClient context via `MyRouterContext`

### Environment Configuration
- Uses `@t3-oss/env-core` for type-safe environment variables
- Server variables defined in `src/env.ts`
- Client variables must use `VITE_` prefix

### Database Schema
- User model with authentication fields and relationships
- Session management with token-based auth
- Account model for OAuth providers
- Example models: Note (user content), Todo (demo data)

### Development Notes
- Devtools integrated: TanStack Router, Query, and React Devtools
- Path aliases configured via `vite-tsconfig-paths`
- Component library: Shadcn UI (latest version)
- Use `pnpx shadcn@latest add [component]` to add new components
- TypeScript with strict configuration