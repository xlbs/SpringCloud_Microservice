import React from 'react';
import {Modal, Form, Input, Button, Tree} from 'antd';
import {showInfo} from "../../../../commutils/components/dialog/MessageDialog";
import {DictSelect,CommSelect} from '../../../../commutils/components/utils/Select';

class MenuModalDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hasFeedback: {
                name: false,
                rank: false,
                type: true,
                username: false,
                password: false,
                confirm: false,
            },
            validateStatus: {
                name: '',
                rank: '',
                type: 'success',
                username: '',
                password: '',
                confirm: '',
            },
            help: {
                name: '',
                rank: '',
                type: '',
                username: '',
                password: '',
                confirm: '',
            },
            buttonDisabled: true,
            rank: "1",

        };
    }

    componentWillMount() {
        const content = this.props.modalDialog.dialog.content;
        if(content){
            const id = content.id;
            this.setState({
                hasFeedback: {
                    name: true,
                    rank: true,
                    type: true,
                    username: true,
                    password: true,
                    confirm: true,
                },
                validateStatus: {
                    name: 'success',
                    rank: 'success',
                    type: 'success',
                    username: 'success',
                    password: 'success',
                    confirm: 'success',
                },
            });
            // this.props.modalDialog.findRoleInfo(id);
        }
    }

    cancel(){
        this.props.modalDialog.closeDialog();
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
                buttonDisabled: true
            });
            callback(this.state.help[field]);
        }else{
            let buttonDisabled = true;
            const roleInfo = this.props.modalDialog.roleInfo;
            const content = this.props.modalDialog.dialog.content;
            if(content){ //编辑
                if(roleInfo && roleInfo[field] != fieldValue){
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

    onChange(value){
        if(value != 1){
            this.props.modalDialog.findMenuByRank(value-1);
        }
        this.setState({
            rank: value,
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const title = this.props.modalDialog.dialog.title + '用户';
        const roleInfo = this.props.modalDialog.roleInfo;
        let {name,rank} = {};
        if(roleInfo && this.props.modalDialog.dialog.content){
            name = roleInfo.name;
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
                            <Button type="primary" onClick={this.save.bind(this)} disabled={this.state.buttonDisabled}>
                                保存
                            </Button>
                        </div>
                    ]}
                >
                    <Form>
                        {this.props.modalDialog.dialog.content?
                            <Form.Item
                                label="菜单标识"
                            >
                                {getFieldDecorator('id',{
                                    initialValue: name? name : '',
                                })(
                                    <Input type='text' disabled={true}/>
                                )}
                            </Form.Item>
                            :
                            ""
                        }

                        <Form.Item
                            label="菜单名称"
                            hasFeedback={this.state.hasFeedback.name}
                            validateStatus={this.state.validateStatus.name}
                            help={this.state.help.name}
                        >
                            {getFieldDecorator('name',{
                                rules: [{
                                    required: true,
                                    validator: this.validateInputField.bind(this,'name','请输入菜单名称!'),
                                }],
                                initialValue: name? name : '',
                            })(
                                <Input type='text' placeholder="请输入菜单名称"/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="菜单等级"
                            hasFeedback={this.state.hasFeedback.rank}
                            validateStatus={this.state.validateStatus.rank}
                            help={this.state.help.rank}
                        >
                            {getFieldDecorator('rank',{
                                rules: [{
                                    required: true, message: '请选择菜单等级!',
                                }],
                                initialValue: rank ? rank+'' : this.state.rank,
                            })(
                                <DictSelect
                                    category="MENU_RANK"
                                    placeholder="请选择菜单等级"
                                    onChange={this.onChange.bind(this)}
                                />
                            )}
                        </Form.Item>

                        {this.state.rank != 1?
                            <Form.Item
                                label="上级菜单"
                                hasFeedback={this.state.hasFeedback.type}
                                validateStatus={this.state.validateStatus.type}
                                help={this.state.help.type}
                            >
                                {getFieldDecorator('parentId',{
                                    rules: [{
                                        required: true, message: '请选择上级菜单!',
                                    }],
                                    // initialValue: type||type==0? type+'' : '2',
                                })(
                                    <CommSelect
                                        items={this.state.parentMenus}
                                        placeholder="请选择上级菜单"
                                    />
                                )}
                            </Form.Item>
                            :
                            ""
                        }





                        <Form.Item
                            label="是否可用"
                            hasFeedback={this.state.hasFeedback.type}
                            validateStatus={this.state.validateStatus.type}
                            help={this.state.help.type}
                        >
                            {getFieldDecorator('isEnable',{
                                rules: [{
                                    required: true, message: '请选择是否可用!',
                                }],
                                // initialValue: type||type==0? type+'' : '2',
                            })(
                                <DictSelect
                                    category="ACTION"
                                    placeholder="请选择是否可用"
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(MenuModalDialog);