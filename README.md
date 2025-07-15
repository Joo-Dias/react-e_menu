
# E-MENU 🍽️

Esse projeto é um sistema desenvolvido para auxiliar garçons no atendimento de mesas em estabelecimentos como bares e restaurantes. Com um interface simples e funcional, o garçom pode gerenciar seus atendimentos de forma prática e organizada.

### ✅ Funcionalidades principais

- Cadastro e Login de Garçom: Cada garçom pode criar sua própria conta e fazer login.
- Abertura de Mesas: Permite abrir novas mesas para iniciar o atendimento de clientes.
- Anotação de Pedidos: Registre os pedidos de forma rápida e clara, vinculando-os a uma mesa específica.
- Criação de Categorias: Organize os itens do cardápio por categorias, como bebidas, entradas, pratos principais, sobremesas etc.
- Cadastro de Itens: Adicione novos produtos ao sistema com facilidade.
- Fechamento de Mesa: Após o pagamento, é possível encerrar a mesa e limpar os dados daquele atendimento.

## Stack utilizada 🚀

**Front-end:** Next, SCSS, TypeScript

**Back-end:** Node, Express, TypeScript, Postgres


## Demonstração

Insira um gif ou um link de alguma demonstração


## Variáveis de ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

`JWT_SECRET`


## Como rodar o projeto localmente

Front-end:
```bash
  npm install
  npm run dev
```

Back-end:
```bash
    npm install
    npx prisma generate
    npm run dev
```
    
