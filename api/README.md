# api

RESTful API backend for the Benevolus crowdfunding platform, built with Laravel 12.

## Technology Stack

-   **Laravel** - Web Framework
-   **Laravel Sanctum** - Authentication via API tokens
-   **Laravel Fortify** - Authentication backend
-   **Laravel Socialite** - OAuth integration
-   [**Woovi PHP SDK**](https://github.com/woovibr/php-sdk) - Brazilian payment gateway
-   **Stripe** - International payment processing
-   **Laravel Reverb** - WebSocket server
-   **Laravel Echo** - Event broadcasting
-   **Pest** - PHP testing framework
-   **Laravel Pint** - Code style fixer
-   **Laravel Sail** - Docker
-   **Laravel Pail** - Log viewer
-   **AWS S3** - File storage

## Requirements

-   PHP 8.2+
-   Composer
-   Node.js and npm
-   Database (MySQL, PostgreSQL, or SQLite)

## Installation

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer run swagger:generate
```

## Development

Start development environment:

```bash
composer run dev
```

This command runs the Laravel server, queue worker, log viewer, and Vite dev server concurrently.

## API Documentation

Interactive API documentation available at:

```
http://localhost/scalar
```
