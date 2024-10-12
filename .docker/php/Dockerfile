FROM php:8.3.11-fpm

WORKDIR /var/www/html

RUN apt-get update -y \
    && apt-get install libzip-dev libicu-dev libpq-dev libmcrypt-dev libonig-dev libsodium-dev libpng-dev curl libxml2-dev wget vim -y \
    && rm -r /var/lib/apt/lists/* \
    && docker-php-ext-install \
        zip \
        mbstring \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        opcache \
        sodium \
        gd \
        xml \
        pcntl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN chown -R www-data:www-data /var/www/html

COPY php.ini /etc/php.ini

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8080

CMD ["php-fpm"]
