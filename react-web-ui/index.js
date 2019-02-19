import React from 'react';
import ReactDOM from 'react-dom';
import './src/statics/css/commcss.css';
import createProjectStore from './src/store/createProjectStore';
import App from "./src/App";
import {createStore} from "redux";
import testReducer from "./src/test/TestReducer";
import Provider from "react-redux/es/components/Provider";
import TestContainer from "./src/test/TestContainer";

if (module.hot) {
    module.hot.accept();
}

// const store = createStore(testReducer);
// ReactDOM.render(
//     <div className="global">
//         <Provider store = {store}>
//             <TestContainer />
//         </Provider>
//     </div>,
//     document.getElementById('root')
// )

const store = createProjectStore();
ReactDOM.render(
    <div className="global">
        <App store={store}/>
    </div>,
    document.getElementById('root')
)