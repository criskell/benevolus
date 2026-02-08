# benevolus

A platform for managing charity campaigns and processing donations.

## What it does

Benevolus provides the tools needed to create and manage donation campaigns, handle payments securely, and keep track of contributions. It's built to be straightforward for campaign organizers while offering a smooth experience for donors.

Our goal is to provide a platform with 0% platform fee, ensuring that donations go directly to the causes that need them most.

## Tech stack

- Backend: Laravel framework
- Frontend: Next.js with HeroUI components
- Payments: Woovi and Stripe Connect for processing donations
- Infrastructure: Terraform and AWS for deployment

## Getting started

Make sure you have Docker installed (for Laravel Sail) and pnpm for the frontend.

1. Start the API:

   ```bash
   cd api && ./vendor/bin/sail up
   ```

2. Start the frontend:
   ```bash
   cd web && pnpm run dev
   ```
