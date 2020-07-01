const { getMessage } = require('../helpers/messages');
const TYPE_JSON = 'application/json'; //facilita utilizar em outros lugares
const STATUS_CODE_OK = 200; //não é uma boa pratica deixar o status direto no response
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;


//utilizando o middleware eu posso criar function para criar varias respostas padronizadas
const jsonOK = function(data, message, metadata){
    const status = STATUS_CODE_OK;
    /*
        o message e o metadata utilizo um ternário para padronizá-lo
        ? se for verdadeiro isso
        : se não isso;
    */
    message = (message) ? message: getMessage('response.json_ok');
    metadata = (metadata) ? metadata: {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status : status});
}

const jsonBadRequest = function(data, message, metadata){
    const status = STATUS_CODE_BAD_REQUEST;
    /*
        o message e o metadata utilizo um ternário para padronizá-lo
        ? se for verdadeiro isso
        : se não isso;
    */
    message = (message) ? message: getMessage('response.json_bad_request');
    metadata = (metadata) ? metadata: {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status: status});
}

const jsonUnauthorized = function(data, message, metadata){
    const status = STATUS_CODE_UNAUTHORIZED;
    /*
        o message e o metadata utilizo um ternário para padronizá-lo
        ? se for verdadeiro isso
        : se não isso;
    */
    message = (message) ? message: getMessage('response.json_unauthorized');
    metadata = (metadata) ? metadata: {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status : status});
}

const jsonNotFound = function(data, message, metadata){
    const status = STATUS_CODE_NOT_FOUND;
    /*
        o message e o metadata utilizo um ternário para padronizá-lo
        ? se for verdadeiro isso
        : se não isso;
    */
    message = (message) ? message: getMessage('response.json_not_found');
    metadata = (metadata) ? metadata: {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status : status});
}

const jsonServerError = function(data, message, metadata){
    const status = STATUS_CODE_SERVER_ERROR;
    /*
        o message e o metadata utilizo um ternário para padronizá-lo
        ? se for verdadeiro isso
        : se não isso;
    */
    message = (message) ? message: getMessage('response.json_server_error');
    metadata = (metadata) ? metadata: {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status : status});
}

const response = (req, res, next) => {
    
    res.jsonOK = jsonOK;
    res.jsonBadRequest = jsonBadRequest;
    res.jsonUnauthorized = jsonUnauthorized;
    res.jsonNotFound = jsonNotFound;
    res.jsonServerError = jsonServerError;
    
    next();//o next só significa que é para continuar o projeto depois do response
};

module.exports = response;