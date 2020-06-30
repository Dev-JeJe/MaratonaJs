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
    const email = 'jeffycordan@gmail.com';
    const password = '123456';

    const hash = bcrypt.hashSync(password, saltRounds);
    console.log(hash);
    /*
        a biblioteca bcrypt tem a function hash e hashSync.
        nesse caso utilizaremos a hashSync que pede os seguintes parametros:
            → o que sera encriptado : pass
            → saltOrRounds : uma string que aceita letras e numeros para auxiliar na criptografia
    */

    const result = await Account.create({email , password :hash });
    //salva no db
    /*
     o Account.create() retorna uma promise:
     .then() → OK
     .catch() → Error
     nessa aplicação utilizamos um JS mais moderno com o async e o await
    */

    return res.json(result);
});//router for register

module.exports = router; //permiter exportar o router