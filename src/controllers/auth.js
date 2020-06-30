//responsavel pela autenficicacao
const express = require('express');

const router = express.Router();
/*
    nessa pag será feita a organização das rotas(router)
*/

router.get('/sign-in', (req, res) => {
    return res.json('Sign in');
});//router for login

router.get('/sign-up', (req, res) => {
    return res.json('Sign up');
});//router for register

module.exports = router; //permiter exportar o router