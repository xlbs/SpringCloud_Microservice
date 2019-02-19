import React from 'react';

import HandleMain from './probusiness/main';
import CRoute from "./routes/CRoute";

class Main extends React.Component{
    render(){
        return(
            <HandleMain>
                <CRoute />
            </HandleMain>
        )
    }
}

export default Main;