export const SIGN_IN = 'SIGN_IN';

/*
    uma action ela é uma função que retorna um objeto de duas propriedade o type e o payload
    → payload: na implementação será uma promise de uma req ajax feita pela API
*/
export const signIn = (data) => {
    return {type: SIGN_IN, payload: data};
};