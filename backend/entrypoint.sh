#!/bin/bash
# Run migrations
php artisan migrate --force

# Start the queue worker in the background
php artisan queue:work --tries=3 &

# Start the Laravel server
php artisan serve --host=0.0.0.0 --port=8000
