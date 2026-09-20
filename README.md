# UncleFix

Full-stack on-demand service and repair application built with TypeScript across the entire stack.

## Architecture

UncleFix is structured as a TypeScript monorepo with end-to-end type safety:

```
unclefix/
├── frontend/             # React + Vite + TypeScript + Tailwind CSS + shadcn/ui
├── backend/              # Node.js + Express + TypeScript + Prisma ORM + PostgreSQL
├── shared/               # Shared TypeScript schemas & inferred types (Zod)
│   └── schemas/
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

## Shared Schemas (`shared/schemas/`)

Common Zod validation schemas and inferred TypeScript types shared across frontend and backend:
- `auth.schema.ts` - Login, registration, password reset
- `user.schema.ts` - User profile, update, status
- `service.schema.ts` - Services catalogue, categories, pricing
- `request.schema.ts` - Service requests, booking, scheduling
- `provider.schema.ts` - Service provider profile, skills, verification
- `payment.schema.ts` - Transactions, payment intents, methods
- `rating.schema.ts` - Reviews and ratings

## Backend Modular Monolith (`backend/src/`)

Organized as a layered modular monolith:
- `config/` - Environment variables and global configuration
- `db/` - Prisma client singleton connection
- `middlewares/` - Zod schema validation, auth guards, centralized error handling
- `utils/` - Standardized API responses and custom errors
- `modules/` - Feature modules (`auth`, `users`, `services`, `providers`, `requests`, `estimates`, `payments`, `ratings`), each containing:
  - `*.routes.ts` - Express router definitions
  - `*.controller.ts` - HTTP request/response handling
  - `*.service.ts` - Business logic layer
  - `*.repository.ts` - Data access layer (Prisma)
  - `*.validation.ts` - Module-specific validation bindings

## Getting Started

1. Copy `.env.example` to `.env` in the root (or `backend/.env`):
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run Prisma migrations and generate client:
   ```bash
   pnpm --filter backend prisma migrate dev
   ```
4. Start development servers:
   ```bash
   pnpm dev
   ```
