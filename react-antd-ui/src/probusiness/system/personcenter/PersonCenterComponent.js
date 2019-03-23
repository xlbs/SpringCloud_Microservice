import React from 'react';
import Button from "antd/es/button/button";

class PersonCenterComponent extends React.Component{

    // componentWillMount() {
    // }
    // componentDidMount() {
    //     console.log('Component DID MOUNT!')
    // }
    // componentWillReceiveProps(newProps) {
    //     console.log('Component WILL RECEIVE PROPS!')
    // }
    // shouldComponentUpdate(newProps, newState) {
    //     return true;
    // }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log('Component WILL UPDATE!');
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log('Component DID UPDATE!')
    // }
    // componentWillUnmount() {
    //     console.log('Component WILL UNMOUNT!')
    // }

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