# Benevolus

Open source charity campaign platform with 0% platform fee.

## Tech Stack

- **API**: Laravel 12 (PHP 8.4) with Sail/Docker, Sanctum auth
- **Web**: Next.js 16, HeroUI, React Query, Kubb (OpenAPI codegen), next-intl
- **Backoffice**: Vite + React 19 + shadcn/ui
- **Payments**: Woovi (PIX) + Stripe Connect

## Project Layout

- `api/` - REST API with Service Layer pattern (Controller -> Service -> Model)
- `web/` - Public frontend using App Router and Server Components
- `backoffice/` - Admin panel
- `terraform/` - AWS infrastructure

## Key Commands

- `./vendor/bin/sail up -d` - Start API (inside `api/`)
- `./vendor/bin/sail artisan test` - Run Pest tests (inside `api/`)
- `pnpm dev` - Start frontend (inside `web/`)
- `pnpm api:generate` - Regenerate Kubb API client (inside `web/`, requires API running)

## Conventions

### Laravel (API)

- Always add `declare(strict_types=1)`
- Keep controllers thin, business logic goes in `app/Services/`
- Use FormRequests for validation and Policies for authorization
- New features need Pest tests in `tests/Feature/`

### Next.js (Web)

- Forms: use `react-hook-form` with `defaultValues` for API data. Never useState + useEffect for form state.
- i18n: every visible string must use `useTranslations()` - labels, placeholders, errors, empty states
- API calls: use Kubb-generated hooks (`useGetCampaign`, `useCreateDonation`, etc.)
- Components: prefer HeroUI components over custom implementations
- Data fetching: Server Components by default, Client Components only for interactivity

### Common Pitfalls

- Calling `getCsrfToken()` before every mutation (only needed for auth flows)
- Overengineering solutions when the existing stack already handles it
- Forgetting i18n on error messages or placeholder text

## Git

- Commit format: `type(scope): description` (e.g., `fix(auth): handle expired sessions`)
- Small, focused PRs with `## Summary` and `## Context` in the body
- PRs must include a video, GIF or screenshots showing the change working
