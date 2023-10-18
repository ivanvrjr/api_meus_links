const usuarioRepository = require("../repositories/usuariosRepositorys");
const bcrypt = require("bcrypt");


const buscar = async () => {
    const resposta = await usuarioRepository.usuarios();

    return resposta;
};
const buscarId = async (id) => {
    const usuario = await usuarioRepository.buscarPorId(id);

    if (usuario) {

        return usuario;
    }

    return null;
};

const criar = async (usuario) => {
    await usuarioRepository.novoUsuario(usuario);
};
const logar = async (email, senha) => {
    const usuario = await usuarioRepository.buscarPorEmail(email);

    if (usuario) {
        const senhaCorrespondente = await bcrypt.compare(senha, usuario.senha);

        if (senhaCorrespondente) {
            return usuario;
        }
    }

    return null;
};
const atualizarToken = async (id, token, expiracaoToken) => {
    const usuario = await usuarioRepository.atualizarToken(id, token, expiracaoToken);

    return usuario;
};
const buscarLinkId = async (id) => {
    const links = await usuarioRepository.buscarLinkId(id);

    if (links) {

        return links;
    }

    return null;
};

const criarLink = async (link, id) => {
    await usuarioRepository.criarLink(link, id);
};
const atualizarLink = async (link, id_link) => {
    await usuarioRepository.atualizarLink(link, id_link);
};
const deletarLink = async (id_link) => {
    await usuarioRepository.deletarLink(id_link);
};
module.exports = { buscar, buscarId, criar, logar, atualizarToken, buscarLinkId, criarLink, atualizarLink, deletarLink };
