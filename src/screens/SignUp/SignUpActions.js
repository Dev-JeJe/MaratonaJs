/*
    uma action ela é uma função que retorna um objeto de duas propriedade o type e o payload
    → payload: na implementação será uma promise de uma req ajax feita pela API
*/
import {apiPost} from '../../helpers/api';

export const SIGN_UP = 'SIGN_UP';

export const signUp = (data) => {
    const payload = apiPost('/auth/sign-up', data);
    return {type: SIGN_UP, payload};
};