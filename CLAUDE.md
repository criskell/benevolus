# Benevolus

See @AGENTS.md for project conventions, commands and architecture.

## Dev Workflow

1. Start API: `cd api && ./vendor/bin/sail up -d`
2. Start Web: `cd web && pnpm dev`
3. After API endpoint changes: `pnpm api:generate` in `web/` to regenerate Kubb client
4. Before committing: `sail artisan test` in `api/`

## Quick Reference

- Package manager: `pnpm` (not npm or yarn)
- API containers: Laravel Sail (`./vendor/bin/sail`)
- OpenAPI spec: `api/public/api-docs.json`
- Generated client: `web/src/lib/http/generated/` (gitignored, regenerate with `pnpm api:generate`)
- Translations: `web/i18n/{en,pt,es}.json`

## Local Environment

- API `.env`: `DB_HOST=mysql`, `SESSION_DOMAIN=localhost`
- Web `.env`: `NEXT_PUBLIC_API_URL=http://localhost`, `NEXT_PUBLIC_APP_URL=http://localhost:3000`
