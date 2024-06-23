class Profissional {

    constructor(id, cpf, nome, data_nascimento, num_registro, endereco, descricao, especialidade, cidade, email, senha, imagem) {
        this._id = id;
        this._cpf = cpf;
        this._nome = nome;
        this._data_nascimento= data_nascimento;
        this._num_registro = num_registro;
        this._endereco = endereco;
        this._descricao = descricao;
        this._especialidade = especialidade;
        this._cidade = cidade;
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

    get numRegistro() {
        return this._numRegistro;
    }

    get endereco() {
        return this._endereco;
    }

    get descricao() {
        return this._descricao;
    }

    get especialidade() {
        return this._especialidade;
    }

    get cidade() {
        return this._cidade;
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

    set numRegistro(value) {
        this._numRegistro = value;
    }

    set endereco(value) {
        this._endereco = value;
    }

    set descricao(value) {
        this._descricao = value;
    }

    set especialidade(value) {
        this._especialidade = value;
    }

    set cidade(value) {
        this._cidade = value;
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

    static async login(pool, email, senha) {
        try {
            const query = 'SELECT * FROM profissional WHERE email = $1 AND senha = $2';
            const values = [email, senha];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                const profData = result.rows[0];
                return new Profissional(profData.id, profData.cpf, profData.nome, profData.data_nascimento, profData.email, profData.senha, profData.imagem, profData.endereco);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao autenticar Profissional! ', error.message);
            throw error;
        }
    }
}

module.exports = Profissional;