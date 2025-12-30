# API Bola Na Rede

`Este projeto está em fase de desenvolvimento. Algumas partes podem ainda estar incompletas ou sujeitas a mudanças.`

API RESTful desenvolvida como PoC para o aplicativo Bola Na Rede, focada em gerenciamento de usuários, verificação em duas etapas de email e 
autenticação de sessão via JWT.

## Funcionalidades 

- Registro e autenticação de usuários.
- Verificação de email com códigos enviados por email.
- Geração e renovação de tokens JWT para sessões seguras.
- Endpoints para gerenciamento de partidas e jogadores.

## Libs e Stack utilizadas 

nodemailer - Enviar códigos de verificação para emails na criação da conta.
bcrypt - Gerar hash a partir de códigos e senhas de acesso antes de enviar ao DB.
cors - Habilitar CORS na API.
jsonwebtoken - Gerar tokens de autenticação para sessões de usuários.
dotenv - Gerenciar variáveis de ambiente.
express - Criação e gerenciamento de rotas.
supbase - Banco de dados e autenticação de usuários.
nodemon - Reinício automático do servidor durante o desenvolvimento.

## Como rodar a API localmente 

1. Clone o repositório:
   git clone https://github.com/Mateus-Ca13/API-BolaNaRede.git
   
2. Navegue até o diretório do projeto:
   cd API-BolaNaRede
   
3. Instale as dependências:
   npm install

4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias (exemplo: `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS` e `EMAIL_APP_PASS`).

5. Inicie a API:
   npx nodemon app.js

6. A API estará rodando em `http://localhost:8000` por padrão.

## Rotas da API 

- `POST /auth/register`: Registra um novo usuário.
- `POST /auth//email-token-verify`: Verifica o email do usuário com um código.
- `POST /auth//login`: Autentica um usuário e retorna um token JWT.
- `POST /auth//refresh-token`: Gera um novo token de acesso usando um refresh token.
- `POST /auth//send-email-token`: Envia um código de verificação para o email do usuário.
- `GET /matches/get-list`: Retorna a lista de partidas disponíveis.
- `PUT /matches/get-match-players`: Retorna a lista de jogadores da partida.

## Front-end

O front-end do aplicativo Bola Na Rede pode ser encontrado no seguinte repositório: [Repositório do Front-end](https://github.com/Mateus-Ca13/Bola_na_Rede.git)

