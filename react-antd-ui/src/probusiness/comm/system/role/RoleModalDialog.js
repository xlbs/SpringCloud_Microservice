import React from 'react';
import {Modal, Form, Input, Button, Tree} from 'antd';
import {showInfo} from "../../../../commutils/components/dialog/MessageDialog";

class RoleModalDialog extends React.Component {

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
            buttonDisabled: true,

            autoExpandParent: false,
            initCheckedKeys: [],
            expandedKeys: [],
            checkedKeys: [],
            selectedKeys: [],
            submitCheckedKeys: [],
        };
    }

    componentWillMount() {
        this.props.modalDialog.findAllMenu();
        const content = this.props.modalDialog.dialog.content;
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
            });
            this.props.modalDialog.findById(id);
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
            this.setState({
                hasFeedback,
                validateStatus,
                help,
                buttonDisabled:true
            });
            callback(this.state.help[field]);
        }else{
            let buttonDisabled = true;
            const info = this.props.modalDialog.info;
            const content = this.props.modalDialog.dialog.content;
            if(content){ //编辑
                if(info && info[field] != fieldValue){
                    buttonDisabled = false;
                }
            }else{ //新增
                buttonDisabled = false;
            }
            hasFeedback[field] = true;
            validateStatus[field] = 'success';
            help[field] = '';
            this.setState({
                hasFeedback,
                validateStatus,
                help,
                buttonDisabled: buttonDisabled
            });
            callback();
        }
    }

    renderTree(){
        const menus = this.props.modalDialog.menus;
        let roleMenus ;
        if(this.props.modalDialog.info){
            roleMenus = this.props.modalDialog.info.menus;
        }
        let checkedKeys = [];
        let submitCheckedKeys = [];
        if(roleMenus&&this.props.modalDialog.dialog.content){
            roleMenus.map(roleMenu => {
                submitCheckedKeys.push(roleMenu.id);
                if(roleMenu.children.length === 0){
                    checkedKeys.push(roleMenu.id);
                }else{
                    roleMenu.children.map(children => {
                        submitCheckedKeys.push(children.id);
                        checkedKeys.push(children.id);
                    })
                }


            });
            if(this.props.modalDialog.info.render){
                this.setState({
                    autoExpandParent: true,
                    checkedKeys: checkedKeys,
                    expandedKeys: checkedKeys,
                    initCheckedKeys: checkedKeys,
                    submitCheckedKeys: submitCheckedKeys,
                });
                this.props.modalDialog.info.render = false;
            }
        }
        return(
            <div id="menu">
                <div style={{lineHeight:'39px'}}>
                    <label><span style={{color:'red',marginRight:'4px',fontSize:'14px',fontFamily:'SimSun'}}>*</span>菜单:</label>
                </div>
                {menus.length!=0?
                    <Tree
                        checkable={true}

                        autoExpandParent={this.state.autoExpandParent}
                        expandedKeys={this.state.expandedKeys}
                        onExpand={this.onExpand.bind(this)}

                        checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck.bind(this)}

                        treeData={menus}
                    />
                    :
                    <div className="menu-div-text">您还未创建菜单，请先在菜单管理中创建菜单</div>
                }
            </div>

        )
    }
    onExpand(expandedKeys) {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    onCheck(checkedKeys,e){
        let submitCheckedKeys = [].concat(checkedKeys);
        e.checkedNodes.map(checkedNode => {
            if(checkedNode.props.parentId){
                if(submitCheckedKeys.indexOf(checkedNode.props.parentId.toString()) == -1){ //不包含
                    submitCheckedKeys.push(checkedNode.props.parentId.toString());
                }
                if(checkedKeys.indexOf(checkedNode.props.parentId.toString()) > -1){ //包含
                    checkedKeys.splice(checkedKeys.indexOf(checkedNode.props.parentId.toString()),1);
                }
            }
        });
        let buttonDisabled = true;
        if(checkedKeys.length != 0 && checkedKeys.toString() != this.state.initCheckedKeys.toString()){
            buttonDisabled = false;
        }
        this.setState({
            checkedKeys: checkedKeys,
            submitCheckedKeys: submitCheckedKeys,
            buttonDisabled: buttonDisabled,
        });
    }

    cancel(){
        this.props.modalDialog.closeDialog();
    }

    save(){
        this.props.form.validateFieldsAndScroll( (err, values) =>{
            if (!err) {
                const content = this.props.modalDialog.dialog.content;
                if(content){
                    values.id =  content.id;
                }
                if(this.state.submitCheckedKeys.length != 0){
                    let menus =[];
                    this.state.submitCheckedKeys.map( key => {
                        menus.push({id: key});
                    })
                    values.menus = menus;
                    this.props.modalDialog.save(values);
                }else{
                    showInfo("请为角色分配菜单");
                }
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const title = this.props.modalDialog.dialog.title + '角色';
        const info = this.props.modalDialog.info;
        let {name} = {};
        if(info && this.props.modalDialog.dialog.content){
            name = info.name;
        }
        return (
            <div>
                <Modal
                    title={title}
                    centered={true}
                    maskClosable={false}
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
                            <Button type="primary" onClick={this.save.bind(this)} disabled={this.state.buttonDisabled}>
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

export default Form.create()(RoleModalDialog);