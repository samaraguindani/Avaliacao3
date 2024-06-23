const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const PORTA = process.env.PORTA || 3000;

const clienteRoutes = require('./routes/clienteRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/clientes', clienteRoutes);
app.use('/profissionais', profissionalRoutes);

app.use('/', router);

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
