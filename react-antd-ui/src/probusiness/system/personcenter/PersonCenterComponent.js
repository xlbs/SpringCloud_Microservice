import React from 'react';
import Button from "antd/es/button/button";

class PersonCenterComponent extends React.Component{

    render() {

        return (
            <div>
                <Button type="primary" onClick={this.props.personCenter.actions.exportUserInfo}>
                    导出用户信息
                </Button>
            </div>
        )
    }
}

export default PersonCenterComponent;