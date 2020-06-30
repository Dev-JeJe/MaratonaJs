//nessa página eu posso criar uma validação para cada parte da controller
const {getValidatorError} = require('../helpers/validator'); // valida a mensagem de error filtrando-a
const Joi = require('@hapi/joi');



const accountSignUp = (req, res, next)=> {
    const {email, password, password_confirmation} = req.body;

    const schema = Joi.object({
        email: Joi.string().email().required(),//essas functions validam se é: uma string/um email/e é obrigatório
        password: Joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')),// é uma string/ e é delimitada por uma expresão regular
        // RegExp : uma senha com min de 3 e max de 30 caracteres e pode usar letras maius/minus com números
        password_confirmation: Joi.string().valid(Joi.ref('password')).required(), // valida se o password é igual
    });


    const options = {abortEarly: false};
    const { error } = schema.validate({email, password, password_confirmation}, options);
    // o schema.validate retorna a validação de todas as info do schema
    // OBS: abortEarly se estiver como true a primeira info que não for válida vai parar o processo e acusar erro
    if ( error ){
        const messages = getValidatorError(error, 'account.signup');//o segundo parâmetro é para saber a mensagem json
    
        return res.jsonBadRequest(null,null,{ error : messages}); // para ver a mensagem de error mais detalhada é só mudar o messages por error
    }
    //Parâmetros: data: retorna nada, message: mensagem default, metadata : error da validação

    next();
};

module.exports = {accountSignUp}