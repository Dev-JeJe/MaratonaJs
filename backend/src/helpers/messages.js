const messages = require('../config/messages.json');//configuração das mensagens de erro


const getMessage = (path) => {
    return messages[path] || null;
};

module.exports = {getMessage};