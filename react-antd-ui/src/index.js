import React from 'react';

import HandleMain from './probusiness/main';
import MenuRoute from "./routes/MenuRoute";

class Main extends React.Component{
    render(){
        return(
            <HandleMain>
                <MenuRoute />
            </HandleMain>
        )
    }
}

export default Main;