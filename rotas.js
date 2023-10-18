const express = require('express');
const usuarioController = require("./controllers/usuariosController");
const auth = require("./middlewares/auth");


const rotas = express.Router();

rotas.get('/usuarios', usuarioController.buscar)
rotas.get('/usuarios/:id', usuarioController.buscarPeloId)
rotas.post('/usuarios', usuarioController.criar)
rotas.post('/usuarios/login', usuarioController.logar)
// aqui verifica o token - rotas.get('/usuarios', auth.verifyToken, usuarioController.buscar);
rotas.get('/usuarios/:id/links', usuarioController.buscarLinkPeloId)
rotas.post('/links/:id', auth.verifyToken, usuarioController.criarLink)
rotas.put('/links/:id_link', auth.verifyToken, usuarioController.atualizarLink)
rotas.delete('/links/:id_link', auth.verifyToken, usuarioController.deletarLink)



module.exports = rotas