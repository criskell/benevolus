# api

RESTful API backend for the Benevolus crowdfunding platform, built with Laravel 12.

## Technology Stack

### Core Framework
- **Laravel 12** - PHP web framework
- **PHP 8.2** - Runtime environment

### Authentication & Authorization
- **Laravel Sanctum** - API token authentication
- **Laravel Fortify** - Authentication backend
- **Laravel Socialite** - OAuth integration

### Payment Processing
- **OpenPix SDK** - Brazilian payment gateway (PIX, credit cards, boleto)
- **Stripe** - International payment processing

### Real-time Communication
- **Laravel Reverb** - WebSocket server
- **Laravel Echo** - Event broadcasting

### Documentation
- **L5-Swagger** - OpenAPI/Swagger documentation

### Testing
- **Pest** - PHP testing framework
- **Pest Drift** - Migration testing

### Development Tools
- **Laravel Pint** - Code style fixer
- **Laravel Sail** - Docker development environment
- **Laravel Pail** - Log viewer

### Infrastructure
- **AWS S3** - File storage
- **Guzzle** - HTTP client

## Requirements

- PHP 8.2+
- Composer
- Node.js and npm
- Database (MySQL, PostgreSQL, or SQLite)

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
http://localhost:8000/api/documentation
```

## Project Structure

- `app/Http/Controllers/API/` - API controllers
- `app/Services/` - Business logic
- `app/Models/` - Eloquent models
- `app/DTO/` - Data Transfer Objects
- `app/Http/Resources/` - API resources
- `app/Http/Requests/` - Form requests
- `routes/api.php` - API routes

## License

MIT License
