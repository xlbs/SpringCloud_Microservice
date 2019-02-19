import {combineReducers} from 'redux';
import locationReducer from './location';
import { reducer as formReducer } from 'redux-form';
import {routerReducer} from 'react-router-redux';

// 注入reducer
export const injectReducer = (store, {key, reducer}) => {
    if(Object.prototype.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location: locationReducer,
        routing: routerReducer,
        form: formReducer,
        ...asyncReducers
    })
};

export default makeRootReducer;