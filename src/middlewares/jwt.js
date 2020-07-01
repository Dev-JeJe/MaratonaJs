//middleware responsável por validar os tokens e colocar na requisição quem é o Id do account
const { verifyJwt } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
    //esse jwt será passado em todas as requisições, num header 'authorization'
    let token = req.headers['authorization'];
    token = token ? token.slice(7, token.length) : null ;
    /*
        o token, por default, chega com 7 caracteres não relacionados a ele, então utilizasse o slice para cortar
    */

    //verificação do token
    if (!token) return res.jsonUnauthorized(null, 'Invalid token');

    try{
        const decoded = verifyJwt(token);
        req.accountId = decoded.id;
        
        next();
    }catch(error){
        return res.jsonUnauthorized(null, 'Invalid token');
    }

    /*
        console.log('Decoded', new Date(decoded.exp * 1000));
        new Date(decoded.exp * 1000) → além de retornar o token decodificado com essa função também é retornado até que dia irá durar  
    */
};

module.exports = checkJwt;