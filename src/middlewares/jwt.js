//middleware responsável por validar os tokens e colocar na requisição quem é o Id do account
const { verifyJwt } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
    // as rotas de sign-in e sign-up não é para ter verificação de token
    const { url: path } = req;

    const excludedPaths = ['/auth/sign-in', '/auth/sign-up'];

    const isExcluded = !!excludedPaths.find( p => p.startsWith(path)); //verifica se algum dos path de sign estiver na requisição 
    //(!!) → muda a varivável para boolean
    if (isExcluded) return next(); //se for um path que não precise de validação de token

    //console.log(path, isExcluded);
    //esse jwt será passado em todas as requisições, num header 'authorization'
    let token = req.headers['authorization'];
    
    token = token ? token.slice(7, token.length) : null ;
    /*
        o token, por default, chega com 7 caracteres não relacionados a ele, então utilizasse o slice para cortar
    */

    //verificação do token
    //console.log('Token: ', token);
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