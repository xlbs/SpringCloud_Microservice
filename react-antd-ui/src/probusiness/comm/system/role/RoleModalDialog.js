import React from 'react';
import {Modal, Form, Input, Row, Col, Button, Tree} from 'antd';
import {showInfo} from "../../../../commutils/components/dialog/MessageDialog";
import {DataDict} from "../../../../commutils/utils/CommUtils";

class UserModalDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hasFeedback: {
                name: false,
                type: true,
                username: false,
                password: false,
                confirm: false,
            },
            validateStatus: {
                name: '',
                type: 'success',
                username: '',
                password: '',
                confirm: '',
            },
            help: {
                name: '',
                type: '',
                username: '',
                password: '',
                confirm: '',
            },
            confirmDirty: false,
            indeterminate: false,
            checkAll: false,
            checkedList: [],
            buttonDisabled: true,
            clickCheckbox: false,
        };

    }

    componentWillMount() {
        this.props.modalDialog.findMenus();
        const content = this.props.modalDialog.dialog.content;
        this.setState({
            checkedKeys: [],
            selectedKeys: [],
        });
        if(content){
            const id = content.id;
            this.setState({
                hasFeedback: {
                    name: true,
                    type: true,
                    username: true,
                    password: true,
                    confirm: true,
                },
                validateStatus: {
                    name: 'success',
                    type: 'success',
                    username: 'success',
                    password: 'success',
                    confirm: 'success',
                },
                // checkedKeys: [],
                // selectedKeys: [],
            });
            this.props.modalDialog.findRoleInfo(id);
        }
    }

    validateInputField(field, msg, rule, value, callback){
        const form = this.props.form;
        let hasFeedback = this.state.hasFeedback;
        let validateStatus = this.state.validateStatus;
        let help = this.state.help;
        const fieldValue = form.getFieldValue(field);
        if(!fieldValue){
            hasFeedback[field] = true;
            validateStatus[field] = 'error';
            help[field] = msg;
            this.setState({hasFeedback,validateStatus,help,buttonDisabled:true});
            callback(this.state.help[field]);
        }else{
            if(field=='confirm'){
                if (fieldValue && fieldValue !== form.getFieldValue('password')) {
                    hasFeedback[field] = true;
                    validateStatus[field] = 'error';
                    help[field] = '两次输入的密码不一致';
                    this.setState({hasFeedback,validateStatus,help,buttonDisabled:true});
                    callback(this.state.help[field]);
                } else {
                    hasFeedback[field] = true;
                    validateStatus[field] = 'success';
                    help[field] = '';
                    this.setState({hasFeedback,validateStatus,help,buttonDisabled:false});
                    callback();
                }
            }else{
                hasFeedback[field] = true;
                validateStatus[field] = 'success';
                help[field] = '';
                this.setState({hasFeedback,validateStatus,help,buttonDisabled:false});
                callback();
            }
            if(field=='password' && this.state.confirmDirty){
                form.validateFields(['confirm'], { force: true });
            }
        }
    }

    /**
     * 保存用户
     */
    saveUserInfo(){
        this.props.form.validateFieldsAndScroll( (err, values) =>{
            if (!err) {
                debugger;
                const content = this.props.modalDialog.dialog.content;
                if(content){
                    values.id =  content.userId;
                }
                const checkedRoles = this.state.checkedList;
                let roles = [];
                for(let i=0; i<checkedRoles.length; i++){
                    roles.push({id:checkedRoles[i]})
                }
                if(roles.length!=0){
                    values.roles = roles;
                    this.props.modalDialog.saveUserInfo(values);
                }else{
                    showInfo("请为用户分配角色");
                }
            }
        });
    }

    /**
     * 取消
     */
    cancel(){
        this.props.modalDialog.closeDialog();
    }

    onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck(checkedKeys,e){
        console.log('checkedKeys', checkedKeys);
        console.log('e.checked', e.checked);
        console.log('e.checkedNodes', e.checkedNodes);
        console.log('e.node', e.node);
        console.log('e.event', e.event);
        console.log('checkedKeys', checkedKeys);
        if(e.checked){
            checkedKeys.push(...this.state.checkedKeys);
        }
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    onSelect(selectedKeys, info){
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };

    renderTree(){
        const menus = this.props.modalDialog.menus;
        const homeMenus = [];
        const otherMenus = [];
        menus.map(menu => {
            if(menu.isHome){
                homeMenus.push(menu);
            }else{
                otherMenus.push(menu);
            }
        });

        let roleMenus ;
        if(this.props.modalDialog.roleInfo){
            roleMenus = this.props.modalDialog.roleInfo.menus;
        }
        let checkedKeys = [];
        if(roleMenus&&this.props.modalDialog.dialog.content){
            roleMenus.map(roleMenu => {
                checkedKeys.push(roleMenu.id)
            })
            if(this.props.modalDialog.roleInfo.render){
                checkedKeys.push(...this.state.checkedKeys);
                this.setState({ checkedKeys });
                this.props.modalDialog.roleInfo.render = false;
            }
        }
        let i = 0;
        return(
            <div id="menu">
                {homeMenus.length>0 ?
                    <Row>
                        {
                            homeMenus.map(menu =>{
                                // let defaultCheckedKeys = [];
                                // defaultCheckedKeys.push(menu.key);
                                return(
                                    <Col span={8}>
                                        <Tree
                                            checkable
                                            // defaultCheckedKeys={defaultCheckedKeys}
                                            // autoExpandParent={true}
                                            // defaultExpandedKeys={["2"]}
                                            // expandedKeys={["2"]}

                                            // onExpand={this.onExpand.bind(this)}
                                            checkedKeys={this.state.checkedKeys}
                                            onCheck={this.onCheck.bind(this)}
                                            // selectedKeys={this.state.selectedKeys}
                                            // onSelect={this.onSelect.bind(this)}
                                            treeData={menu}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    :
                    ""
                }
                {otherMenus.length>0 ?
                    <Row>
                        {
                            otherMenus.map(menu =>{
                                // let defaultExpandedKeys = [];
                                // if(i<3){
                                //     defaultExpandedKeys.push(menu.key);
                                //     i++;
                                // }
                                return(
                                    <Col span={8}>
                                        <Tree
                                            checkable
                                            // defaultCheckedKeys={defaultCheckedKeys}
                                            // autoExpandParent={true}
                                            // defaultExpandedKeys={defaultExpandedKeys}
                                            // expandedKeys={["2"]}

                                            // onExpand={this.onExpand.bind(this)}
                                            checkedKeys={this.state.checkedKeys}
                                            onCheck={this.onCheck.bind(this)}
                                            // selectedKeys={this.state.selectedKeys}
                                            // onSelect={this.onSelect.bind(this)}
                                            treeData={menu}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    :
                    ""
                }
            </div>

        )
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const title = this.props.modalDialog.dialog.title + '用户';
        const userInfo = this.props.modalDialog.userInfo;
        let isEdit = false;
        let {name,type,username} = {};
        if(userInfo&&this.props.modalDialog.dialog.content){
            isEdit = true;
            name = userInfo.name;
            type = userInfo.type;
            username = userInfo.username;
        }

        return (
            <div>
                <Modal
                    title={title}
                    centered
                    visible={true}
                    okText="保存"
                    cancelText="取消"
                    onCancel={this.cancel.bind(this)}//右上角的关闭按钮
                    destroyOnClose={true}
                    footer={[
                        <div className='modal-button'>
                            <Button onClick={this.cancel.bind(this)}>
                                取消
                            </Button>
                            <Button type="primary" onClick={this.saveUserInfo.bind(this)} disabled={this.state.buttonDisabled}>
                                保存
                            </Button>
                        </div>
                    ]}
                >
                    <Form>
                        <Form.Item
                            label="角色"
                            hasFeedback={this.state.hasFeedback.name}
                            validateStatus={this.state.validateStatus.name}
                            help={this.state.help.name}
                        >
                            {getFieldDecorator('name',{
                                rules: [{
                                    required: true,
                                    validator: this.validateInputField.bind(this,'name','请输入角色名称!'),
                                }],
                                initialValue: name? name : '',
                            })(
                                <Input type='text' placeholder="请输入角色名称"/>
                            )}
                        </Form.Item>
                    </Form>

                    {this.props.modalDialog.menus?this.renderTree.bind(this)():""}

                </Modal>
            </div>
        );
    }
}

export default Form.create()(UserModalDialog);