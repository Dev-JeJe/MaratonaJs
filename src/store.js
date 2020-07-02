import {createStore, applyMiddleware, combineReducers} from 'redux';
import ReduxPromise from 'redux-promise';

import accounReducer from './reducers/AccountReducer';

const reducers = combineReducers({
    account: accounReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxPromise));

export default store;