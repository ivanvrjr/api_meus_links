var jwt = require("jsonwebtoken");
const usuarioRepository = require("../repositories/usuariosRepositorys");

const generateToken = (usuario) => {
    const token = jwt.sign(usuario, process.env.SECRET_KEY);
    return token;
};

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "No token provided" });
        }
        const token = req.headers.authorization.split(" ")[1];
        const usuario = await usuarioRepository.buscarPorToken(token);
        if (!usuario || usuario.expiracao_token < new Date()) {
            return res.status(401).json({ error: "Invalid token" });
        }
        jwt.verify(token, process.env.SECRET_KEY);

        next();
    } catch (error) {
        res.status(500).json({ error: "Invalid token" });
    }
};

module.exports = {
    generateToken,
    verifyToken,
};