import React from 'react';
import {Modal, Form, Input, Checkbox, Row, Col, Button, Tree} from 'antd';
import {showInfo} from "../../../../commutils/components/dialog/MessageDialog";
import {DataDict} from "../../../../commutils/utils/CommUtils";

const { TreeNode } = Tree;

class UserModalDialog extends React.Component {

    constructor(props){
        super(props);
        DataDict("USER_TYPE",props.modalDialog.dispatch);
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

            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        };

    }

    componentWillMount() {
        this.props.modalDialog.findMenus();
        const content = this.props.modalDialog.dialog.content;
        if(content){
            const userId = content.userId;
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
            });
            this.props.modalDialog.findUserInfo(userId);
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

    onCheck(checkedKeys){
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    onSelect(selectedKeys, info){
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };

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
                        <div className='user-button'>
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
                            label="角色名"
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

                    {this.props.modalDialog.menus?
                        <Tree
                            checkable
                            defaultCheckedKeys={["1"]}
                            // checkedKeys={["1"]}
                            // autoExpandParent={true}
                            defaultExpandedKeys={["2"]}
                            // expandedKeys={["2"]}

                            onExpand={this.onExpand.bind(this)}
                            onCheck={this.onCheck.bind(this)}
                            onSelect={this.onSelect.bind(this)}
                            selectedKeys={this.state.selectedKeys}
                            treeData={this.props.modalDialog.menus}
                        />
                        :
                        ""
                    }


                </Modal>
            </div>
        );
    }
}

export default Form.create()(UserModalDialog);