import {injectReducer} from '../../store/totalReducer';

export default (location, cb, store) => {
    require.ensure([], (require) => {
        const container = require('./HomeContainer').default;
        const reducer = require('./HomeReducer').default;
        injectReducer(store,{key: 'home', reducer});
        cb(null, container);
    }, 'home')
}