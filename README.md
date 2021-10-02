# Developers APP

Esse projeto foi desenvolvido utilizando PHP/Laravel no Backend e Next.js (React)
no frontend e MariaDB como banco de dados. Essa em uma aplicação completa (SPA e API) para cadastro de desenvolvedores;


### Considerações

Optei por utilizar os recursos nativos do Laravel para a construção da API, tais
como Eloquent API resources, Form Request etc.


### Como Executar

1. Clonar o projeto
2. Executar docker-compose

```console
git clone https://github.com/virb30/developers-app.git
cd developers-app
docker-compose up -d --build
```

## endereços da API

A API é exposta no endereço http://localhost:8000/api

O endpoint utilizado é `developers`

Exemplo:

```console
Listar todos os desenvolvedores:

GET http://localhost:8000/api/developers
```

## Aplicação

A aplicação pode ser acessada através do endereço `http://localhost:3000`


### Melhorias

* Como proposta de melhorias estão: aplicar conceitos de Clean Architecture;
* Melhorar o Visual da aplicação, que está bem simples