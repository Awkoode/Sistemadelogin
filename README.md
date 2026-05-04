# Sistema de Autenticação

Um sistema de login e cadastro moderno com estética *dark terminal* e brutalista. O projeto foi desenvolvido focando em portabilidade e facilidade de setup.

## Requisitos Prévios

Antes de rodar o projeto, você precisa ter instalado:

1. [Node.js](https://nodejs.org/) (Versão 18 ou superior).
2. [PostgreSQL](https://www.postgresql.org/) rodando na sua máquina.

## Como rodar o projeto

O projeto foi configurado para ser "plug and play". Siga os passos:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/SEU_USUARIO/NOME_DO_REPO.git)
   cd login-project
   ```

2. **Instalar Dependencias:**
   ```shell
   npm install
   ```

3. **Configurar o Banco de Dados**

Certifique-se de ter um banco de dados criado no seu PostgreSQL (sugestão de nome: login). Na sua ferramenta de SQL (pgAdmin, psql), execute o comando para criar a tabela:
   ```sql
   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```
4. **Iniciar o projeto**

O projeto possui um script de setup automático. Ao rodar o comando abaixo pela primeira vez, ele criará o arquivo .env com as credenciais padrão.
   ```shell
   npm start
```

**Nota:** Se a senha ou usuário do seu PostgreSQL local forem diferentes de postgres / 1234, abra o arquivo .env gerado na raiz do projeto e altere os valores manualmente antes de tentar logar.

##  Estrutura de Arquivos

- **server.js**: API REST em Node.js com rotas de Login e Registro.  
- **index.html**: Interface visual do sistema.  
- **script.js**: Lógica de front-end, validações e chamadas à API.  
- **style.css**: Estilização completa e animações.  
- **.env**: (Gerado automaticamente) Armazena credenciais sensíveis.

<br><br><br><br>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="40px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40px" />
</p>