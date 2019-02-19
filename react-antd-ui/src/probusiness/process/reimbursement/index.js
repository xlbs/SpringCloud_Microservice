import React from 'react';
import Button from "antd/es/button/button";

class handleReimbursement extends React.Component{
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div>
                <Button type="primary">
                    报销申请
                </Button>
            </div>

        )
    }

}

export default handleReimbursement;