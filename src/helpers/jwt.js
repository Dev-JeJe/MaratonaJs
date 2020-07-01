/*  */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;/* não é interessante deixar a chave aqui */
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = {expiresIn: '30 minutes'}; /* tempo que o jwt ira expirar */
const refreshOptions = {expiresIn: '30 days'};

/* functions para gerar e verificar o jwt */
const generateJwt = (payload) =>{
    return jwt.sign(payload, tokenPrivateKey, options);
}; 

const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivateKey);
};

/* functions para gerar e verificar o refresh jwt */
const generateRefreshJwt = (payload) =>{
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

const verifyRefreshJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey);
};

const getTokenFromHeaders = (headers) => {
    //esse jwt será passado em todas as requisições, num header 'authorization'
    const token = headers['authorization'];

    //o token, por default, chega com 7 caracteres não relacionados a ele, então utilizasse o slice para cortar  
    return token ? token.slice(7, token.length) : null ;
};

module.exports = {generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt, getTokenFromHeaders};