import React from 'react';
import Button from "antd/es/button/button";

class handleLeave extends React.Component{
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div>
                <Button type="primary">
                    请假申请
                </Button>
            </div>

        )
    }

}

export default handleLeave;