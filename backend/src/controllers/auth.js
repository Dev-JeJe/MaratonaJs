//responsavel pela autenficicacao
const express = require('express');
const bcrypt = require('bcrypt');//biblioteca de criptografia
const { accountSignUp, accountSignIn } = require('../validators/account');
const { getMessage } = require('../helpers/validator');
const { generateJwt, generateRefreshJwt, getTokenFromHeaders, verifyRefreshJwt } = require('../helpers/jwt');
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

router.post('/sign-in', accountSignIn, async (req, res) => {
    const {email, password} = req.body;
    const account = await Account.findOne({where: { email }});
    /*  
        para não repetir o if, criou um ternário no match para ver se o account tem o password
        if(!account) return res.jsonBadRequest(null, getMessage('account.signin.invalid'));
    */
    const match = account ? bcrypt.compareSync(password, account.password) : null; //validando senha

    if (!match) return res.jsonBadRequest(null, getMessage('account.signin.invalid'));

    const token = generateJwt({id: account.id});
    const refreshToken = generateRefreshJwt({id: account.id, version: account.jwtVersion});

    return res.jsonOK(account, getMessage('account.signin.success'), {token, refreshToken});
});//router for login

router.post('/sign-up', accountSignUp , async (req, res) => {
    /*
        como a ideia é utilizar o accountSignUp como um middleware de validação o ideal e colocalo na requisição 
        do sign-up para ele validar antes da requisição ocorrer
    */
    
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
    if(account) return res.jsonBadRequest(null, getMessage('account.signup.email_exist'));

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
    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion});

    return res.jsonOK(newAccount, getMessage('account.signup.success'), {token, refreshToken});
});//router for register

router.post('/refresh', async (req, res) =>{
    const token = getTokenFromHeaders(req.headers);
    /*
        function criada para substituir as seguintes lines:
            → let token = req.headers['authorization'];
            → token = token ? token.slice(7, token.length) : null ;
    */
    
    if (!token) return res.jsonUnauthorized(null, 'Invalid token');

    try{
        const decoded = verifyRefreshJwt(token);
        const account = await Account.findByPk(decoded.id); //Pk → Primary Key
        if (!account)  return res.jsonUnauthorized(null, 'Invalid token');

        if(decoded.version != account.jwtVersion) return res.jsonUnauthorized(null, 'Invalid token');

        const meta = {
            token : generateJwt({id: account.id}),
        }

        return res.jsonOK(null, null, meta);

    }catch(error){
        return res.jsonUnauthorized(null, 'Invalid token');
    }
});//router for refreshToken

module.exports = router; //permiter exportar o router