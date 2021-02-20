export const getTokenExpire = (token) => {
    // const tokenParts = token.split('.'); //o split no token é para poder fragmentar os dados e poder trabalhar com a info desejada
    // const header = tokenParts[0];
    // const payload = tokenParts[1];
    // const signature = tokenParts[2];
    /*
        const [header, payload, signature] = token.split('.');
        como o header e o signature não são utilizados eles são removidos na atribuição do const
        porém, permanece a ',' antes do payload para indicar que o primeiro dado não é para ser pego
    */
    if(!token) return 0;
    try{
    const [, payload] = token.split('.'); // substituiu as 4 primeiras linhas da function
    const data = JSON.parse(atob(payload)); //atob: function nativa do JS que faz o parse de um base64
    const expires = data ? data.exp : 0; //tempo para o token expirar

    return expires;
    }catch(e){
        return 0;
    }
};