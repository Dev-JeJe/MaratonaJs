import {useEffect} from 'react';
import {connect} from 'react-redux';
import { getToken } from '../../helpers/account';
import {getTokenExpire} from '../../helpers/jwt';
import {getFreshToken} from '../../actions/AccountActions';

const TokenRefresher = ({getFreshToken}) =>{
    const TRESHOLD = 30;
    const calculate = () => {
        const token = getToken();
        const expires = getTokenExpire(token);
        const secondsToExpire = expires - (Date.now() /1000); //Date.now(): retorna o tempo atual em milisegundos
        

        return secondsToExpire;
    };
    
    useEffect(() =>{
        // const readbleTime = secondsToReadableTime(secondsToExpire);
        const secondsToExpire = calculate() - TRESHOLD;
        const id = setTimeout(getFreshToken, secondsToExpire * 1000);
        return () => clearTimeout(id)
    }, [getFreshToken]);
    
    setInterval(calculate, 1000);

    return null;
};

const mapStateToProps = (state) => {
    return {}; //esse return é com base no store.js
};

export default connect(mapStateToProps, { getFreshToken })(TokenRefresher);