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
   - O banco será iniciado na porta padrão `5432` com usuário e senha `postgres` e banco `desafio_dev`.
  
 5. **Execute para criar os arquivos de migração do banco de dados:**

      ```bash
      npm run db:generate
      ```

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
- `courseId` (UUID, FK -> `courses.id`, obrigatório)
-  `createdAt` (timestamp com timezone, obrigatório, padrão: now() )

  ## Testes automatizados
- Este projeto utiliza Vitest para a execução de testes de integração, garantindo que as rotas e regras de negócio funcionem corretamente. Para garantir a integridade dos dados, os testes em 2025 são executados em um ambiente PostgreSQL totalmente isolado.

### 🛠️ Configuração do Ambiente de Testes

1. Banco de Dados no Docker (setup.sql)
   - O projeto utiliza um script de inicialização automática no Docker. O arquivo localizado em ./docker/setup.sql garante que o ambiente suba com dois bancos independentes:
         ```
         -- Criado automaticamente ao subir o container
         CREATE DATABASE desafio_test;
         ```
2. Arquivo de configuração `.env.test`
   - É necessário criar um arquivo `.env.test` na raiz do projeto para instruir o Vitest a utilizar as credenciais de teste. Sem este arquivo, os testes podem falhar por falta de conexão ou por tentar acessar o banco de desenvolvimento:
   
      ```
      # Define o ambiente como teste
      NODE_ENV="test"
      
      # URL de conexão apontando especificamente para o banco de testes criado via setup.sql
      DATABASE_DOCKER_URL="postgres://postgres:postgres@localhost:5432/desafio_test"
      
      # Segredo JWT exclusivo para o ambiente de testes
      JWT_SECRET="secret"
      ```
   - Dessa forma, o banco desafio_dev fica reservado para uso manual (via Drizzle Studio ou Postman), enquanto o desafio_test é utilizado exclusivamente pela suíte de testes.
  
   ### Explicação dos Scripts de Teste
   - A automação no `package.json` já garante que o banco de dados esteja pronto antes da execução dos testes:
     
      -    `npm run pretest`:    
      -       "pretest": "dotenv -e .env.test drizzle-kit push"
         -    Este comando é acionado automaticamente sempre que você executa `npm run test`, ele utiliza o `dotenv -e .env.test` para carregar as credencias do banco de teste e o `drizzle-kit push` para sincronizar instantaneamente o seu schema (`src/database/schema.ts`) com o banco `desafio_test`. Isso elimina a necessidade de rodar migrações manuais para os testes, garantindo que as tabelas existam e estejam atualizadas.
           
      -    `npm run test`:
      -        "test": "dotenv -e .env.test vitest run"
        -   Este é o comando principal que inicia o executor de testes Vitest. Ele força a aplicação a ler o arquivo `.env.test`, garantindo que tanto o servidor Fastify quanto as factories de dados (como a criação de usuários e cursos) se conectem excluisvamente ao banco de testes, mantendo o seu bancode desenvolveimento(`desafio_dev`) intacto.
       
   ### Como executar os testes
      1. Certifique-se de que o container Docker está rodando: `docker-compose up -d`;
      2. Garante que o arquivo `.env.test` foi criado corretamente na raiz do projeto.
      3. No terminal, execute apenas:```npm run test```  

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run db:generate` — Gera os arquivos SQL do Drizzle ORM com base nas alterações feitas nas tabelas no arquivo `src/database/schema.ts`.
- `npm run db:migrate` — Executa as migrations SQL e aplica as alterações no banco de dados.
- `npm run db:seed` — Popula o banco de dados com dados iniciais baseado no arquivo `src/database/seed.ts`.
- `npm run db:studio` — Abre o Drizzle Studio para visualização e inspeção do banco de dados.
- `npm run pretest` — Prepara o banco de testes sincronizando o schema.
- `npm run test` — Executa todos os testes de integração de forma sequencial utilizando o ambiente de testes.

## 👨‍💻 Desenvolvido por

**Matheus Carvalho**

- LinkedIn: [@matheusscarvalho](https://www.linkedin.com/in/matheusscarvalho/)
- GitHub: [@matheusscarvalho1](https://github.com/matheusscarvalho1)
