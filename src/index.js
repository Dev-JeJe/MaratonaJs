const express = require('express');
const authController = require('./controllers/auth');
const app = express();


app.use('/auth', authController);
/* 
tendo o authController, as rotas exportadas, agora precisa apontar para o express usando app.use()
    com isso as rotas ficam dessa forma:
        → /auth/sign-in
        → /auth/sign-up
*/
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