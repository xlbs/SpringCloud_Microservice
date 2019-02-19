import {injectReducer} from '../../store/totalReducer';

export default (location, cb, store) => {
    require.ensure([], (require) => {
        const container = require('./MainContainer').default;
        const reducer = require('./MainReducer').default;
        injectReducer(store,{key: 'mains', reducer});
        cb(null, container);
    }, 'mains')
}