# Computoria

## Pre-requisitos para executar o projeto localmente
> Node.js e MySql

## Mysql
- O download do mysql pode ser encrontado aqui: [MySql](https://dev.mysql.com/downloads/installer/)
- Ao instalar fique atento na hora da criação do seu usuario e senha, guarde essas credencias
- Ainda na instalação crie um usuario chamado **computoria_dev** com a senha **senha123**
- Com o MySql instalado, conecte-se com o usuario criado e crie um banco de dados chamado **computoria_db**

## Node.js
Para instalar, buildar, exportar o projeto execute o seguintes comandos em ordem.

1. Instalar todas as dependencias necessarias.
```
npm install
```
2. Executar todas as operações do banco de dados.
```
npm run dball
```
3. Buildar o projeto Next.js
```
npm run build
```
4. Inicializar o projeto na url http://localhost:3000
```
npm start
```
