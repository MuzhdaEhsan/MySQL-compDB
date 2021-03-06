# Competency Database

## Installation Guide

-   Database: download the latest version of Postgres for your OS here <https://www.postgresql.org/download/>
-   PHP requirements: version 7.3+ (x64 non thread safe)
-   Copy .env.example, rename it to .env and change database connection information

## Setup Guide

Run these commands for the first time

```bash
php artisan key:generate

composer install

npm install
```

Run these commands for the first time **or** when pull latest changes that has new migrations/packages

```bash
php artisan migrate:fresh --seed

composer install

npm install
```

Run these commands to run the app (open two separate terminals)

```bash
npm run watch

php artisan serve
```

Run these commands when deploying the app

Cache using php artisan \*:cache for better performance

```bash
npm run production
```

Sometimes there are changes that Laravel doesn't pickup automatically, cancel `php artisan serve` and run `php artisan cache:clear` and rerun the app again
