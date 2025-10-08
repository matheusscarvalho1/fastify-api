# Fastify Project - API de Cursos

Este projeto é uma API RESTful desenvolvida com [Fastify](https://www.fastify.io/) e [TypeScript](https://www.typescriptlang.org/), utilizando [Drizzle ORM](https://orm.drizzle.team/) para integração com banco de dados PostgreSQL. O objetivo principal é gerenciar cursos, permitindo criar, listar, buscar, atualizar e deletar cursos.

## Funcionalidades

- Criar um novo curso
- Listar todos os cursos
- Buscar curso por ID
- Atualizar curso por ID
- Deletar curso por ID

## Tecnologias Utilizadas

- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) (validação de dados)
- [Swagger](https://swagger.io/) (documentação de API)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd fastify
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o banco de dados:**

   - O projeto utiliza Docker para o banco PostgreSQL. Inicie o serviço com:
     ```bash
     docker-compose up -d
     ```
   - O banco será iniciado na porta padrão `5432` com usuário e senha `postgres` e banco `desafio`.

4. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env` na raiz do projeto com a string de conexão do banco:
     ```env
     DATABASE_URL=postgres://postgres:postgres@localhost:5432/desafio
     ```

5. **Execute as migrações:**

   ```bash
   npm run db:migrate
   ```

6. **Execute as seeds para popular o banco:**

   ```bash
   npm run db:seed
   ```

7. **Inicie o servidor em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

8. **Veja os dados populados no banco:**
   ```bash
   npm run db:studio
   ```

- **Utilize um dos usuários que foram populados vendo pelo studio do drizzle para autenticar e obter um login no sistema**
- OBS: A senha padrão é `Teste@123`.

O servidor estará disponível em `http://localhost:3333`.

## Rotas Principais

### Criar Curso

- **POST** `/courses`
- Body:
  ```json
  {
    "title": "Nome do Curso",
    "description": "Descrição opcional"
  }
  ```

### Listar Todos os Cursos

- **GET** `/courses`

### Buscar Curso por ID

- **GET** `/courses/:id`

### Atualizar Curso

- **PUT** `/courses/:id`
- Body:
  ```json
  {
    "title": "Novo Título",
    "description": "Nova descrição"
  }
  ```

### Deletar Curso

- **DELETE** `/courses/:id`

## Documentação da API

Durante o desenvolvimento, a documentação Swagger estará disponível em:

- `http://localhost:3333/docs`

## Estrutura do Banco de Dados

Tabela `courses`:

- `id` (UUID, PK)
- `title` (string, único, obrigatório)
- `description` (string, opcional)

Tabela `users` (não utilizada nas rotas atuais, mas presente no schema):

- `id` (UUID, PK)
- `name` (string, obrigatório)
- `email` (string, único, obrigatório)

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run db:migrate` — Executa as migrações do banco de dados
- `npm run db:generate` — Gera artefatos do Drizzle ORM
- `npm run db:studio` — Abre o Drizzle Studio para visualização do banco


## Banco de dados de teste

- Lembrar de criar o banco de dados de teste com o script:
``CREATE DATABASE desafio_test 
WITH 
OWNER = postgres 
ENCODING = 'UTF8'
TEMPLATE = template1  
CONNECTION LIMIT = -1;``

## 👨‍💻 Desenvolvido por

**Matheus Carvalho**

- LinkedIn: [@matheusscarvalho](https://www.linkedin.com/in/matheusscarvalho/)
- GitHub: [@matheusscarvalho1](https://github.com/matheusscarvalho1)
