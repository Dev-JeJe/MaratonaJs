import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';

import App from './app';

import './styles/main.scss';
import TokenRefresher from './components/TokenRefresher';

ReactDOM.render(
<Provider store={store}>
    <TokenRefresher/>
    <App />
    </Provider>,
    document.getElementById('root')
); //renderiza o que precisar na div root na pasta public

