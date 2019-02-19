import React from 'react';
import {render} from 'react-dom';
import { createStore,bindActionCreators } from 'redux';
import { Provider ,connect} from 'react-redux';
import testReducer from "./src/test/TestReducer";
import TestApp from "./src/test/TestCompent";
// import AppDD from "./src/test/TestApp";


//store
let store = createStore(testReducer);

render(
    <Provider store={store}>
        <TestApp />
        {/*<AppDD />*/}
    </Provider>,
    document.getElementById('root')
)
