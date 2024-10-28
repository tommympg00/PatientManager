# Base image
FROM php:8.2-fpm

# Set working directory
WORKDIR /api

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . .

# Set file permissions
RUN chown -R www-data:www-data /api \
    && chmod -R 755 /api/storage

# Install Laravel dependencies
RUN composer install --optimize-autoloader --no-dev

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 8000 (default for PHP-FPM)
EXPOSE 8000

# Run the entrypoint script
CMD ["/entrypoint.sh"]


