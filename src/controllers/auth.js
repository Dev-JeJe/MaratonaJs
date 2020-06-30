//responsavel pela autenficicacao
const express = require('express');
const bcrypt = require('bcrypt');//biblioteca de criptografia
const { Account } = require('../models');
/*
    esse const é referente as seguintes lines
    const db = require('../models');
    db.Account (...);
*/
//const db = require('../models');
const router = express.Router();
/*
    nessa pag será feita a organização das rotas(router)
*/

const saltRounds = 10; //auxilio para criptografar

router.get('/sign-in', (req, res) => {
    return res.json('Sign in');
});//router for login

router.get('/sign-up', async (req, res) => {
    /*
        o app.use(express.urlencoded({ extended: false})); possibilita a utilização do req
        const {email, password} = req.body; → está linha resumo essas 3:
        const body = req.body;
        const email = body.email;
        const password = body.password;
    */
    const {email, password} = req.body;

    const account = await Account.findOne({where: { email }}); //como retorna uma promise pode ser usado o await
    /*
        verificar se o email já existe no banco
    */
    if(account) return res.jsonBadRequest(null, 'Account already exists');

    const hash = bcrypt.hashSync(password, saltRounds);
    /*
        a biblioteca bcrypt tem a function hash e hashSync.
        nesse caso utilizaremos a hashSync que pede os seguintes parametros:
            → o que sera encriptado : pass
            → saltOrRounds : uma string que aceita letras e numeros para auxiliar na criptografia
    */

    const newAccount = await Account.create({email , password :hash });
    //salva no db
    /*
     o Account.create() retorna uma promise:
     .then() → OK
     .catch() → Error
     nessa aplicação utilizamos um JS mais moderno com o async e o await
    */

    return res.jsonOK(newAccount);
});//router for register

module.exports = router; //permiter exportar o router