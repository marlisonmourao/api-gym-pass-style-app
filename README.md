# Documentação do Projeto

## Descrição

Este projeto é um aplicativo estilo GymPass, que permite aos usuários se cadastrarem, autenticarem, realizarem check-ins em academias, e muito mais.

## Funcionalidades

### Requisitos Funcionais (RFs)

- [x] Cadastro de usuário
- [x] Autenticação de usuário
- [x] Obtenção do perfil de um usuário logado
- [x] Obtenção do número de check-ins realizados pelo usuário logado
- [x] Histórico de check-ins do usuário
- [x] Busca de academias próximas (até 10km)
- [x] Busca de academias pelo nome
- [x] Realização de check-in em uma academia
- [x] Validação de check-in de um usuário
- [x] Cadastro de uma academia

### Regras de Negócio (RNs)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após ser criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores

### Requisitos Não-Funcionais (RNFs)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)

## Estrutura do Projeto

### Diretórios Principais

- **src**: Contém o código-fonte da aplicação.
  - **http**: Controladores e rotas HTTP.
  - **middlewares**: Middlewares utilizados na aplicação.
  - **repositories**: Repositórios para acesso aos dados.
  - **use-cases**: Casos de uso da aplicação.
  - **utils**: Utilitários e funções auxiliares.
  - **env**: Configurações de ambiente.
  - **lib**: Bibliotecas e configurações externas.
- **prisma**: Configurações e migrações do banco de dados Prisma.
- **test**: Configurações e utilitários para testes.

### Principais Arquivos

- **src/app.ts**: Configuração e inicialização do servidor Fastify.
- **src/server.ts**: Ponto de entrada do servidor.
- **prisma/schema.prisma**: Definição do esquema do banco de dados.
- **package.json**: Configurações e dependências do projeto.
- **.env.example**: Exemplo de variáveis de ambiente.
- **docker-compose.yml**: Configuração do Docker para o banco de dados PostgreSQL.

## Configuração e Execução

### Pré-requisitos

- Node.js
- Docker (para o banco de dados PostgreSQL)

### Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd api-solid-node
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.

4. Inicie o banco de dados PostgreSQL com Docker:

   ```bash
   docker-compose up -d
   ```

5. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate deploy
   ```

### Execução

- Para iniciar o servidor em modo de desenvolvimento:

  ```bash
  npm run dev
  ```

- Para executar os testes:
  ```bash
  npm run test
  ```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch para sua feature ou correção de bug:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m 'Minha nova feature'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Para mais informações, consulte os arquivos de código-fonte e a documentação inline.
