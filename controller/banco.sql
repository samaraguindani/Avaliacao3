CREATE TABLE cliente (
    id INT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
	endereco VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    imagem BYTEA
);

CREATE TABLE profissional (
    id INT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
	num_registro VARCHAR(11),
	endereco VARCHAR(100),
	descricao VARCHAR(300) NOT NULL,
	especialidade VARCHAR(100),
	cidade VARCHAR(100),
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    imagem BYTEA
);

CREATE TABLE agendamento (
	id INT PRIMARY KEY,
    data_horário TIMESTAMP NOT NULL,
    cidade VARCHAR(100),
    id_profissional INT,
    id_cliente INT,
	FOREIGN KEY (id_profissional) REFERENCES profissional(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

SELECT * FROM cliente

SELECT * FROM agendamento
SELECT * FROM profissional