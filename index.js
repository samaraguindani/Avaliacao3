const express = require('express');
const { Pool } = require('pg');

const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const router = express.Router();
const PORTA = process.env.PORTA || 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clinicaprosperar',
    password: 'postgres',
    port: 5432, 
});

app.use(bodyParser.json());
app.set('view engine', 'ejs');

// app.get('/', (req,res) => {
//     res.render('index.ejs')
// })

// router.get('/', function (req, res) { 
//     res.sendFile(path.join(__dirname + '/pages/index.html'))  
// });

// router.get('/profissional', function (req, res) { 
//     res.sendFile(path.join(__dirname + '/pages/profissional.html'))  
// });

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM profissional');
        const profissionais = result.rows; // Usar o plural 'profissionais' para o array de resultados
        res.render('index', { profissionais: profissionais }); // Passar 'profissionais' para o template
    } catch (error) {
        console.error('Erro ao buscar profissionais:', error.message);
        return res.status(500).json({ erro: 'Erro ao buscar profissionais.' });
    }
});


// app.post('/pessoa', async (req, res) => { //trocar o endpoint
//     const { nome, email, senha } = req.body;

//     console.log('Dados recebidos:', { nome, email, senha });

//     if (!nome || !email || !senha) {
//         return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
//     }

//     try {
//         const query = 'INSERT INTO pessoa (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
//         const values = [nome, email, senha];
//         const result = await pool.query(query, values);

//         const pessoa = result.rows[0];
//         console.log('Pessoa cadastrada com sucesso:', pessoa);
//         res.json(pessoa);
//     } catch (error) {
//         console.error('Erro ao cadastrar pessoa:', error.message);
//         return res.status(500).json({ erro: 'Erro ao cadastrar pessoa.' });
//     }
// });

// app.get('/profissional', async (req, res) => { 
//     try {
//         const result = await pool.query('SELECT * FROM profissional');
//         const pessoas = result.rows;
//         res.json(pessoas);
//     } catch (error) {
//         console.error('Erro ao buscar profissionais:', error.message);
//         return res.status(500).json({ erro: 'Erro ao buscar profissionais.' });
//     }
// });

// app.put('/pessoa/:id', async (req, res) => { //trocar o endpoint
//     const { nome, email, senha } = req.body;
//     const id = req.params.id;

//     console.log('Dados recebidos para atualização:', { id, nome, email, senha });

//     if (!nome || !email || !senha) {
//         return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
//     }

//     try {
//         const query = 'UPDATE pessoa SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *';
//         const values = [nome, email, senha, id];
//         const result = await pool.query(query, values);

//         const pessoa = result.rows[0];
//         console.log('Pessoa atualizada com sucesso:', pessoa);
//         res.json(pessoa);
//     } catch (error) {
//         console.error('Erro ao atualizar pessoa:', error.message);
//         return res.status(500).json({ erro: 'Erro ao atualizar pessoa.' });
//     }
// });

// app.delete('/pessoa/:id', async (req, res) => { //trocar o endpoint
//     const id = req.params.id;

//     console.log('ID da pessoa a ser deletada:', id);

//     try {
//         const result = await pool.query('DELETE FROM pessoa WHERE id = $1', [id]);
//         console.log('Pessoa deletada com sucesso.');
//         res.json({ mensagem: 'Pessoa deletada com sucesso.' });
//     } catch (error) {
//         console.error('Erro ao deletar pessoa:', error.message);
//         return res.status(500).json({ erro: 'Erro ao deletar pessoa.' });
//     }
// });

app.use('/', router)

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});

