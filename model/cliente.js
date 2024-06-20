class Cliente {

    constructor(id, cpf, nome, dataNascimento, endereco, email, senha, imagem) {
        this._id = id;
        this._cpf = cpf;
        this._nome = nome;
        this._dataNascimento = dataNascimento;
        this._endereco = endereco;
        this._email = email;
        this._senha = senha;
        this._imagem = imagem;
    }

    get id() {
        return this._id;
    }

    get cpf() {
        return this._cpf;
    }

    get nome() {
        return this._nome;
    }

    get dataNascimento() {
        return this._dataNascimento;
    }

    get email() {
        return this._email;
    }

    get senha() {
        return this._senha;
    }

    get imagem() {
        return this._imagem;
    }

    get endereco() {
        return this._endereco;
    }

    set id(value) {
        this._id = value;
    }

    set cpf(value) {
        this._cpf = value;
    }

    set nome(value) {
        this._nome = value;
    }

    set dataNascimento(value) {
        this._dataNascimento = value;
    }

    set email(value) {
        this._email = value;
    }

    set senha(value) {
        this._senha = value;
    }

    set imagem(value) {
        this._imagem = value;
    }

    set endereco(value) {
        this._endereco = value;
    }

    static async login(pool, email, senha) {
        try {
            const query = 'SELECT * FROM cliente WHERE email = $1 AND senha = $2';
            const values = [email, senha];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                const clienteData = result.rows[0];
                return new Cliente(clienteData.id, clienteData.cpf, clienteData.nome, clienteData.data_nascimento, clienteData.email, clienteData.senha, clienteData.imagem, clienteData.endereco);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao autenticar cliente! ', error.message);
            throw error;
        }
    }
}

module.exports = Cliente;
