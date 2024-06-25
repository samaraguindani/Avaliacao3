// Importa o módulo express, que é um framework web para Node.js
const express = require('express');

// Importa o middleware body-parser, que é usado para analisar corpos de requisição
const bodyParser = require('body-parser');

// Cria uma instância do aplicativo Express
const app = express();

// Cria uma instância do roteador do Express
const router = express.Router();

// Define a porta na qual o servidor irá escutar. Usa a variável de ambiente PORTA ou o valor 3000 por padrão
const PORTA = process.env.PORTA || 3000;

// Importa o módulo path, que fornece utilitários para trabalhar com caminhos de arquivos e diretórios
const path = require('path');

// Importa as rotas definidas nos módulos de cliente e profissional
const clienteRoutes = require('./routes/clienteRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');

// Configura o body-parser para analisar requisições URL-encoded e JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define o motor de visualização como EJS, que é um motor de templates para gerar HTML
app.set('view engine', 'ejs');

// Define diretórios estáticos para servir arquivos CSS e imagens
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Configura as rotas para clientes e profissionais, direcionando as requisições para os roteadores específicos
app.use('/clientes', clienteRoutes);
app.use('/profissionais', profissionalRoutes);

// Configura o roteador raiz. Pode ser usado para definir rotas adicionais ou middlewares
app.use('/', router);

// Inicia o servidor e faz com que ele escute na porta especificada
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
