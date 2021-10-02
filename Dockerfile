FROM php:7.4-fpm

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
  && docker-php-ext-install gd pdo_mysql mbstring zip pcntl \
  && docker-php-ext-enable redis

# instalar composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


# instalar node
RUN mkdir -p /usr/local/nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash \
  && source  ${NVM_DIR}/nvm.sh \
  && nvm install ${NODE_VERSION} \
  && nvm alias default ${NODE_VERSION} \
  && nvm use default

ENV NODE_PATH   ${NVM_DIR}/v${NODE_VERSION}/lib/node_modules
ENV PATH        ${NVM_DIR}/v${NODE_VERSION}/bin:$PATH

RUN composer global require laravel/installer

EXPOSE $PORT

CMD ['php', 'artisan', 'serve']