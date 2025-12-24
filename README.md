# Fastify Project - API de Cursos

Este projeto é uma API RESTful desenvolvida com [Fastify](https://www.fastify.io/) e [TypeScript](https://www.typescriptlang.org/), utilizando [Drizzle ORM](https://orm.drizzle.team/) para integração com banco de dados PostgreSQL. O objetivo principal é gerenciar cursos, permitindo criar, listar, buscar, atualizar e deletar cursos, com autenticação JWT e controle de permissões por papel (role - student/manager).

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

3. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env` na raiz do projeto com a string de conexão do banco:
  
        ```env
        # Ambiente da aplicação (development, test ou production)
        NODE_ENV="development"
        
        # Formato: postgresql://[usuario]:[senha]@[host]:[porta]/[nome_do_banco]
        DATABASE_URL="postgres://postgres:postgres@localhost:5432/desafio"

        # Chave secreta para assinatura de tokens JWT (pode ser qualquer string longa e segura)
        JWT_SECRET="secret"
        ```
   

4. **Configure o banco de dados:**

   - O projeto utiliza Docker para o banco PostgreSQL. Inicie o serviço com:
   
        ```bash
        docker-compose up -d
        ```
   - O banco será iniciado na porta padrão `5432` com usuário e senha `postgres` e banco `desafio`.
  
 5. **Execute para criar os arquivos de migração do banco de dados:**

      ```bash
      npm run db:generate
      ```
   - 

6. **Execute as migrações para criar a estrutura do banco de dados baseado no que foi generado no comando generate, anteriormente:**

      ```bash
      npm run db:migrate
      ```

7. **Execute as seeds para popular o banco:**

      ```bash
      npm run db:seed
      ```

8. **Inicie o servidor em modo desenvolvimento:**
      ```bash
      npm run dev
      ```

9. **Veja os dados populados no banco:**
      ```bash
      npm run db:studio
      ```

**Utilize um dos usuários que foram populados vendo pelo studio do drizzle para autenticar e obter um login no sistema**

- OBS: A senha padrão é `Teste@123`.

O servidor estará disponível em `http://localhost:3333`.

## Documentação da API

Durante o desenvolvimento, a documentação Swagger estará disponível em:

- `http://localhost:3333/docs`

## Rotas Principais

### 🔐 Autenticação e Autorização

O sistema utiliza JWT (JSON Web Token) para autenticação.

Cada usuário possui um papel definido no token (``role``):

#### Papel	& Permissões

manager	- Pode criar, listar, buscar, atualizar e deletar cursos
student	- Pode apenas visualizar cursos (`GET /courses` e `GET /courses/:id`)


### 🔑 Obter Token JWT

- Utilize um dos usuários que foram populados vendo pelo studio do drizzle para autenticar e obter um login no sistema, então utilize:
`npm run db:studio`

- Após isso ao abrir o drizzle studio, vá na tabela usuários e use o e-mail de um dos usuários como no exemplo abaixo para realizar a requisição.

- **POST** `/sessions`
- Body:

```json
{
  "email": "test@email.com",
  "password": "Teste@123"
}
```


#### Resposta:
```json
{
  "token": "<seu_token_jwt>"
}
```

### 📤 Enviar Token em Requisições

Inclua o token no cabeçalho da requisição:

```json
{
  "Authorization": "<seu_token_jwt>"
}

```

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

## Estrutura do Banco de Dados

Tabela `courses`:

- `id` (UUID, PK)
- `title` (string, único, obrigatório)
- `description` (string, opcional)

Tabela `users`:

- `id` (UUID, PK)
- `name` (string, obrigatório)
- `email` (string, único, obrigatório)
- `password` (string, obrigatório)
- `role` (enum `user_role`, obrigatório, padrão: `student` onde user_role: `student | manager`)

Tabela `enrollments`:

- `id` (UUID, PK)
- `userId` (UUID, FK -> `users.id`, obrigatório)
- `userId` (UUID, FK -> `courses.id`, obrigatório)
-  `createdAt` (timestamp com timezone, obrigatório, padrão: now() )

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run db:generate` — Gera os arquivos SQL do Drizzle ORM com base nas alterações feitas nas tabelas no arquivo `src/database/schema.ts`.
- `npm run db:migrate` — Executa as migrations SQL e aplica as alterações no banco de dados.
- `npm run db:seed` — Popula o banco de dados com dados iniciais baseado no arquivo `src/database/seed.ts`.
- `npm run db:studio` — Abre o Drizzle Studio para visualização e inspeção do banco de dados.

## 👨‍💻 Desenvolvido por

**Matheus Carvalho**

- LinkedIn: [@matheusscarvalho](https://www.linkedin.com/in/matheusscarvalho/)
- GitHub: [@matheusscarvalho1](https://github.com/matheusscarvalho1)
