FROM php:8.3.11-fpm

WORKDIR /var/www/html

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends \
        libzip-dev \
        curl \
        libxml2-dev \
        wget \
        vim \
        libonig-dev \
    && docker-php-ext-configure mbstring \
    && docker-php-ext-install \
        zip \
        mbstring \
        pdo \
        pdo_mysql \
        opcache \
        pcntl \
        xml \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN chown -R www-data:www-data /var/www/html

COPY php.ini /usr/local/etc/php/php.ini

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8080

CMD ["php-fpm"]
