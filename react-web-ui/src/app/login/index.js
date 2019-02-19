import {injectReducer} from '../../store/totalReducer';

export default (location, cb, store) => {
    require.ensure([], (require) => {
        const container = require('./LoginContainer').default;
        const reducer = require('./LoginReducer').default;
        injectReducer(store,{key: 'login', reducer});
        cb(null, container);
    }, 'login')

}