import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import { browserHistory } from 'react-router';
// import createLogger from 'redux-logger';
import makeRootReducer from './totalReducer';

// const logger = createLogger();

const middleware = [thunk, routerMiddleware(browserHistory)];

const createProjectStore = (initState = {}) => {
    const store = createStore(
        makeRootReducer(),
        initState,
        applyMiddleware(...middleware)
    )
    store.asyncReducers = {};
    return store;
}

export default createProjectStore;