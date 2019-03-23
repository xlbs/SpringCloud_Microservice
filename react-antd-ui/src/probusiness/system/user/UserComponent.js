import React from 'react';
import Button from "antd/es/button/button";

class UserComponent extends React.Component{

    render() {

        return (
            <div>
                <Button type="primary">
                    用户管理
                </Button>
            </div>
        )
    }
}

export default UserComponent;