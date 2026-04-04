# Benevolus

Open source platform for charity campaigns and donations with 0% platform fee.
Tasks are tracked on Linear (prefix BEN-XX). Community and discussions happen on Discord.

## Commands

### API (run inside `api/`)

```bash
./vendor/bin/sail up -d          # Start containers (MySQL, Redis, PHP)
./vendor/bin/sail down           # Stop containers
./vendor/bin/sail artisan migrate # Run database migrations
./vendor/bin/sail artisan test   # Run Pest test suite
./vendor/bin/sail artisan test --filter=TestName # Run specific test
./vendor/bin/sail artisan tinker # Laravel REPL
```

Note: first `sail up` builds the Docker image from scratch and takes ~10-15 minutes.
Subsequent starts are fast thanks to Docker cache.

### Web (run inside `web/`)

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (port 3000)
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm api:generate     # Generate API client from OpenAPI spec (Kubb)
```

Important: `pnpm api:generate` reads from `api/public/api-docs.json`, so the API must have
been started at least once before running this command.

### Backoffice (run inside `backoffice/`)

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server
```

### Startup order

Start the API first (`sail up -d`), then the Web (`pnpm dev`).
The frontend depends on the API running on port 80.
If migrations fail with "Connection refused", wait ~15 seconds for MySQL to initialize.

## Tech Stack

- **API**: Laravel 12 (PHP 8.4), Sail/Docker, Sanctum auth, Pest tests
- **Web**: Next.js 16 (App Router), HeroUI, React Query, Kubb codegen, next-intl (PT/EN/ES)
- **Backoffice**: Vite + React 19 + shadcn/ui (Radix UI)
- **Payments**: Woovi (PIX) + Stripe Connect
- **Infra**: Terraform + AWS (S3, CloudFront, IAM)

## Project Structure

```
api/            Laravel REST API
  app/
    Http/
      Controllers/API/   Thin controllers, delegate to Services
      Requests/          FormRequest validation classes
      Resources/         API response transformers
    Models/              Eloquent models
    Services/            Business logic (one service per domain)
    DTO/                 Data transfer objects
    Policies/            Authorization policies
  tests/Feature/         Pest feature tests
  database/migrations/   Database schema

web/            Next.js public frontend
  src/
    app/                 App Router pages and layouts
    components/          Reusable UI components (by feature)
    lib/http/generated/  Kubb-generated API client and hooks (gitignored)
    hooks/               Custom React hooks
    atoms/               Jotai atoms (client state)
  i18n/                  Translation files (en.json, pt.json, es.json)

backoffice/     Admin panel (Vite + React)
  src/
    pages/               Route pages
    components/          UI components (shadcn/ui based)

terraform/      AWS infrastructure (S3, CloudFront, IAM)
```

## Code Conventions

### General

- Follow existing codebase patterns instead of inventing new ones
- Use type inference when TypeScript can infer - avoid unnecessary type annotations
- Avoid type assertions (`as`) - prefer Kubb-generated types
- Create utility functions for reusable logic (e.g., cents-to-currency conversion)

### API (Laravel)

- `declare(strict_types=1)` in every PHP file
- Thin controllers: delegate business logic to Services (`app/Services/`)
- Use FormRequests for validation, Policies for authorization
- Service Layer pattern: Controller -> Service -> Model
- Processor pattern for multi-step operations (DonationProcessor, WithdrawalProcessor)
- PaymentGatewayInterface abstracts payment providers
- Document endpoints with OpenAPI attributes
- Write Pest tests for new features (`tests/Feature/`)

### Web (Next.js)

- `react-hook-form` for all forms - never manage form state with useState
- Never use `useEffect` to sync form state with API data - use `defaultValues`
- Apply i18n (`useTranslations`) to ALL visible strings: labels, placeholders, error messages, empty states
- Use Kubb-generated hooks for API calls (`useGetCampaign`, `useCreateDonation`, etc.)
- Server Components for data fetching, Client Components for interactivity
- Use HeroUI components - don't create custom ones when HeroUI has an equivalent
- Prefer Suspense API over manual loading states with Spinner

### Backoffice

- Use shadcn/ui components built on Radix UI
- Follow the same React patterns as the Web app

## Common Pitfalls

These have caused PR rejections in the past:

- Adding `useEffect` to sync form state with API data (use react-hook-form `defaultValues` instead)
- Forgetting i18n on visible strings (even placeholders and error messages)
- Calling `getCsrfToken()` before every mutation (only needed for auth flows)
- Overengineering simple features (e.g., WebSocket when polling works, new lib when existing stack handles it)
- Submitting large PRs that mix unrelated changes

## Testing

- API: Pest tests in `tests/Feature/` - run with `sail artisan test`
- Always test changes locally before committing
- Web: no automated test setup currently

## Git Conventions

- Commits: `type(scope): short description` (e.g., `feat(donations): add payment form`)
- Types: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `test`
- PRs: small, focused, incremental
- PR title and body in English
- PR body format: `## Summary` + `## Context`
- PRs must include a video, GIF or screenshots showing the change working
- Branch naming: `type/short-description` (e.g., `feat/donate-form`)

## Architecture

### Auth Flow

- Laravel Sanctum (cookie-based) with CSRF protection
- CSRF token from `XSRF-TOKEN` cookie, forwarded as `X-XSRF-TOKEN` header
- Proxy in `next.config.ts` rewrites `/api/*` and `/sanctum/*` to avoid CORS
- Google OAuth via Laravel Socialite

### API Client (Web)

- Kubb generates TypeScript types and React Query hooks from `api/public/api-docs.json`
- Generated code lives in `web/src/lib/http/generated/` (gitignored)
- Run `pnpm api:generate` after API endpoint changes
- React Query for server state, Jotai for client state
