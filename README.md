# Projeto de Cadastro, Login e Consulta de Clima

## Tecnologias Utilizadas

### Back-End

- **Node.js**
- **Express**
- **TypeORM**
- **PostgreSQL**
- **Redis**
- **Axios**
- **Docker**
- **JWT**

### Front-End

- **React**
- **Vite**
- **Context API**
- **Axios**
- **CSS Modules**

---

## Requisitos para Rodar o Projeto

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose** (para o Redis no Back-End)
- **Git** (para clonar os repositórios)

---

## Como Configurar e Rodar

### Back-End

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/CharlesVilarinho/weather-app.git
   cd backend
   ```

2. **Instalar Dependências**

   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente**

   Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis:

   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/seubanco
   JWT_SECRET=sua_chave_secreta
   REDIS_HOST=localhost
   REDIS_PORT=6379
   WEATHER_API_KEY=sua_chave_da_api_de_clima
   ```

4. **Subir o Redis com Docker**

   ```bash
   docker-compose up -d
   ```

5. **Rodar as Migrações**

   ```bash
   npm run typeorm migration:run
   ```

6. **Iniciar o Servidor**

   ```bash
   npm run dev
   ```

7. **Executar o Back-End**

   O servidor estará disponível em http://localhost:3000.

### Front-End

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/CharlesVilarinho/weather-app.git
   cd backend
   ```

2. **Instalar Dependências**

   ```bash
   npm install
   ```

<!-- 3. **Configurar Variáveis de Ambiente**

   Crie um arquivo .env na raiz do projeto com a URL do Back-End:

   ```env
   VITE_API_URL=http://localhost:3000/api -- Configurar console.log
   ``` -->

4. **Iniciar o Servidor**

   ```bash
   npm run dev
   ```

5. **Executar o Front-End**

   O servidor estará disponível em http://localhost:5173.

### Banco de dados

1. **Tabela de usuários**

   ```sql
    CREATE TABLE public."user" (
    id serial NOT NULL,
    username varchar NOT NULL,
    "password" varchar NOT NULL,
    state varchar NULL,
    city varchar NULL,
    country varchar NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
    CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username)
    );
   ```

2. **Tabela de histórico de consultas(logado)**

   ```sql
   CREATE TABLE "search_history" (
   "id" SERIAL PRIMARY KEY,
   "city" VARCHAR(100) NOT NULL,
   "country" VARCHAR(100) NOT NULL,
   "temperature" FLOAT NOT NULL,
   "humidity" FLOAT NOT NULL,
   "description" TEXT NOT NULL,
   "date" TIMESTAMP DEFAULT now(),
   "userId" INT NOT NULL,
   CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
   );
   ```
