# Fastify Project - API de Cursos

Este projeto é uma API RESTful desenvolvida com [Fastify](https://www.fastify.io/) e [TypeScript](https://www.typescriptlang.org/), utilizando [Drizzle ORM](https://orm.drizzle.team/) para integração com banco de dados PostgreSQL. O objetivo principal é gerenciar cursos com sistema de autenticação e autorização baseado em roles (estudante e gerente).

## Funcionalidades

### Autenticação e Autorização

- Sistema de login com JWT
- Controle de acesso baseado em roles (student/manager)
- Middleware de autenticação para rotas protegidas

### Gerenciamento de Cursos

- Criar um novo curso (apenas managers)
- Listar todos os cursos com paginação e busca
- Buscar curso por ID
- Atualizar curso por ID
- Deletar curso por ID

### Funcionalidades Adicionais

- Documentação automática com Swagger e Scalar
- Sistema de testes automatizados
- Seed data para desenvolvimento
- Validação de dados com Zod
- Logs estruturados com Pino

## Tecnologias Utilizadas

### Backend

- [Fastify](https://www.fastify.io/) - Framework web
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [Zod](https://zod.dev/) - Validação de dados
- [Argon2](https://argon2.online/) - Hash de senhas
- [JSON Web Token](https://jwt.io/) - Autenticação

### Documentação e Desenvolvimento

- [Swagger](https://swagger.io/) - Documentação de API
- [Scalar](https://scalar.com/) - Interface de documentação
- [Pino](https://getpino.io/) - Logging
- [Vitest](https://vitest.dev/) - Framework de testes
- [Supertest](https://github.com/visionmedia/supertest) - Testes de API
- [Faker](https://fakerjs.dev/) - Geração de dados fake

## Estrutura do Projeto

```
src/
├── @types/                    # Definições de tipos TypeScript
├── database/                  # Configuração e schema do banco
│   ├── client.ts             # Cliente Drizzle
│   ├── schema.ts             # Schema das tabelas
│   └── seed.ts               # Dados iniciais
├── routes/                    # Rotas da aplicação
│   ├── courses/              # Rotas de cursos
│   ├── login/                # Rotas de autenticação
│   └── hooks/                # Middlewares de autenticação
├── tests/                     # Testes automatizados
│   └── factories/            # Factories para testes
├── utils/                     # Utilitários
├── app.ts                     # Configuração do Fastify
└── server.ts                  # Inicialização do servidor
```

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

   ```bash
   docker-compose up -d
   ```

4. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:

   ```env
   DATABASE_DOCKER_URL=postgres://postgres:postgres@localhost:5432/desafio_dev
   JWT_SECRET=sua_chave_secreta_aqui
   NODE_ENV=development
   ```

5. **Execute as migrações:**

   ```bash
   npm run db:migrate
   ```

6. **Popule o banco com dados iniciais:**

   ```bash
   npm run db:seed
   ```

7. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3333`.

## Autenticação

### Login

- **POST** `/sessions`
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### Uso do Token

Inclua o token no header `Authorization` para acessar rotas protegidas:

```
Authorization: <token>
```

## Rotas da API

### Cursos (Protegidas - Apenas Managers)

#### Criar Curso

- **POST** `/courses`
- Headers: `Authorization: <token>`
- Body:
  ```json
  {
    "title": "Nome do Curso",
    "description": "Descrição opcional"
  }
  ```

#### Listar Cursos

- **GET** `/courses`
- Headers: `Authorization: <token>`
- Query Parameters:
  - `search` (opcional): Busca por título
  - `orderBy` (opcional): Ordenação (id/title)
  - `page` (opcional): Página para paginação

#### Buscar Curso por ID

- **GET** `/courses/:id`
- Headers: `Authorization: <token>`

#### Atualizar Curso

- **PUT** `/courses/:id`
- Headers: `Authorization: <token>`
- Body:
  ```json
  {
    "title": "Novo Título",
    "description": "Nova descrição"
  }
  ```

#### Deletar Curso

- **DELETE** `/courses/:id`
- Headers: `Authorization: <token>`

## Estrutura do Banco de Dados

### Tabela `users`

- `id` (UUID, PK) - Identificador único
- `name` (string, obrigatório) - Nome do usuário
- `email` (string, único, obrigatório) - Email do usuário
- `password` (string, obrigatório) - Senha hasheada
- `role` (enum, obrigatório) - Role do usuário (student/manager)

### Tabela `courses`

- `id` (UUID, PK) - Identificador único
- `title` (string, único, obrigatório) - Título do curso
- `description` (string, opcional) - Descrição do curso

### Tabela `enrollments`

- `id` (UUID, PK) - Identificador único
- `userId` (UUID, FK) - Referência ao usuário
- `courseId` (UUID, FK) - Referência ao curso
- `createdAt` (timestamp) - Data de criação

## Documentação da API

Durante o desenvolvimento, a documentação estará disponível em:

- **Swagger UI**: `http://localhost:3333/docs`
- **Scalar API Reference**: `http://localhost:3333/docs` (interface moderna)

## Testes

### Executar Testes

```bash
npm test
```

### Estrutura de Testes

- Testes unitários para todas as rotas
- Factories para criação de dados de teste
- Testes de autenticação e autorização
- Banco de dados de teste separado

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run db:migrate` — Executa as migrações do banco de dados
- `npm run db:generate` — Gera artefatos do Drizzle ORM
- `npm run db:studio` — Abre o Drizzle Studio para visualização do banco
- `npm run db:seed` — Popula o banco com dados iniciais
- `npm test` — Executa os testes
- `npm run pretest` — Executa migrações antes dos testes

## Configuração de Testes

Para executar os testes, crie um arquivo `.env.test`:

```env
DATABASE_DOCKER_URL=postgres://postgres:postgres@localhost:5432/desafio_test
JWT_SECRET=test_secret_key
NODE_ENV=test
```

E crie o banco de dados de teste:

```sql
CREATE DATABASE desafio_test
WITH
OWNER = postgres
ENCODING = 'UTF8'
TEMPLATE = template1
CONNECTION LIMIT = -1;
```

## Exemplos de Uso

### Arquivo de Requisições HTTP

O projeto inclui um arquivo `requisicoes.http` com exemplos de todas as rotas para uso com extensões como REST Client do VS Code.

### Dados Iniciais

O seed cria:

- 7 usuários estudantes
- 3 cursos
- Matrículas entre usuários e cursos
- Senha padrão: `Teste@123`

## Licença

Este projeto está licenciado sob a licença ISC.
