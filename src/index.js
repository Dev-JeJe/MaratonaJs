const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    return res.json('API running...');
});
/*
Parametros:
    1º: informa ao express que quando chegar uma requisição tipo GET na 3001
        endereço: https://meusite.com'/'
    2º: function(request, response)
        request: todas as informações sobre a requisição
        response: os method para retornar o que foi pedido

*/

app.listen(3001, () => {
    console.log('Listening on port 3001');
});
/*
    app.listen(3001, () => {
        console.log('Listening on port 3001');
    });

    toda vez que chegar algo na porta 3001 ele vai acusar que chegou nessa porta
*/