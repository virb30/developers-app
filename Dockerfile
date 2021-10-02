FROM php:7.4-cli

WORKDIR /var/www

#instalar dependências
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get install -y \
  build-essential \
  libpng-dev \
  libonig-dev \
  libjpeg62-turbo-dev \
  libfreetype6-dev \
  locales \
  zip \
  jpegoptim optipng pngquant gifsicle \
  vim \
  unzip \
  git \
  curl \
  mariadb-client \
  supervisor \
  libzip-dev \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*


# configure locale
RUN sed -i -e 's/# pt_BR.UTF-8 UTF-8/pt_BR.UTF-8 UTF-8/' /etc/locale.gen && \
  locale-gen

ENV LANG pt_BR.UTF-8
ENV LANGUAGE pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

# configurar locales PT-BR
RUN locale-gen pt_BR.UTF-8 \
  && dpkg-reconfigure  --frontend noninteractive locales

RUN pecl install redis

RUN docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
  && docker-php-ext-configure mysqli --with-mysqli=mysqlnd \ 
  && docker-php-ext-install gd pdo_mysql mbstring zip pcntl

# instalar composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer global require laravel/installer

COPY ./backend ./

RUN composer install

COPY ./.docker/entrypoint-back.sh /usr/bin/entrypoint-back.sh

EXPOSE $PORT

CMD ["/usr/bin/entrypoint-back.sh"]