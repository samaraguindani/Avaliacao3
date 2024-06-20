class Agendamento {
    constructor(id, dataHorario, cidade, idProfissional, idCliente) {
        this._id = id;
        this._dataHorario = dataHorario;
        this._cidade = cidade;
        this._idProfissional = idProfissional;
        this._idCliente = idCliente;
    }

    get id() {
        return this._id;
    }

    get dataHorario() {
        return this._dataHorario;
    }

    get cidade() {
        return this._cidade;
    }

    get idProfissional() {
        return this._idProfissional;
    }

    get idCliente() {
        return this._idCliente;
    }

    set id(value) {
        this._id = value;
    }

    set dataHorario(value) {
        this._dataHorario = value;
    }

    set cidade(value) {
        this._cidade = value;
    }

    set idProfissional(value) {
        this._idProfissional = value;
    }

    set idCliente(value) {
        this._idCliente = value;
    }
}

module.exports = Agendamento;