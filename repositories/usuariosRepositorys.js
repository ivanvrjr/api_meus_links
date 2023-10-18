const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});


const usuarios = async () => {
    try {
        const resposta = await sql`SELECT * FROM usuarios`;
        return resposta;
    } catch (error) {
        return error;
    }
};

const novoUsuario = async (usuario) => {
    await sql`INSERT INTO usuarios (nome_de_usuario, email, senha)
               VALUES (${usuario.nome}, ${usuario.email}, ${usuario.senha})`;

    console.log('Usuário inserido com sucesso.');

};
const buscarPorId = async (id) => {
    try {
        const resposta = await sql`SELECT * FROM usuarios WHERE id = ${id}`;
        return resposta[0];
    } catch (error) {
        return null;
    }
};

const buscarPorEmail = async (email) => {
    try {
        const resposta = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
        return resposta[0];
    } catch (error) {
        return null;
    }
};
const buscarPorToken = async (token) => {
    try {
        const resposta = await sql`SELECT * FROM usuarios WHERE token = ${token}`;
        return resposta[0];
    } catch (error) {
        return null;
    }
};
const atualizarToken = async (id, token, expiracaoToken) => {
    try {
        await sql`UPDATE usuarios
            SET token = ${token}, expiracao_token = ${expiracaoToken}
            WHERE id = ${id}`;
        return "Token atualizado com sucesso";
    } catch (error) {
        return null;
    }
};
const buscarLinkId = async (id) => {
    try {
        const resposta = await sql`SELECT * FROM links WHERE usuario_id = ${id}`;
        return resposta;
    } catch (error) {
        return null;
    }
};


const criarLink = async (link, id) => {
    await sql`INSERT INTO links (titulo, url, usuario_id)
               VALUES (${link.titulo}, ${link.url}, ${id})`;

};
const atualizarLink = async (link, id_link) => {
    await sql`UPDATE links
               SET titulo = ${link.titulo}, url = ${link.url}
               WHERE id = ${id_link}`;

};
const deletarLink = async (id_link) => {
    await sql`DELETE FROM links WHERE id = ${id_link}`;

};
module.exports = {
    usuarios,
    novoUsuario,
    buscarPorId,
    buscarPorEmail,
    atualizarToken,
    buscarPorToken,
    buscarLinkId,
    criarLink,
    atualizarLink,
    deletarLink
};
