const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const clienteRoutes = require('./routes/clienteRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');

const app = express();
const router = express.Router();
const PORTA = process.env.PORTA || 3000;

app.use(session({
    secret: 'jBAKF5685fjhsajdoabDHDKIA524',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.use('/clientes', clienteRoutes);
app.use('/profissionais', profissionalRoutes);

app.use('/', router);

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});


//http://localhost:3000/profissionais