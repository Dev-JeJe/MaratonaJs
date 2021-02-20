import {createStore, applyMiddleware, combineReducers} from 'redux';
import ReduxPromise from 'redux-promise';

import accounReducer from './reducers/AccountReducer';
import linkReducer from './reducers/LinkReducer';

const reducers = combineReducers({
    account: accounReducer,
    link: linkReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxPromise));

export default store;