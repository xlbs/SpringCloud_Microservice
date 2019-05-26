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
                url: false,
                rank: true,
                parentId: true,
                isEnable: true,
            },
            validateStatus: {
                name: '',
                url: '',
                rank: 'success',
                parentId: 'success',
                isEnable: 'success',
            },
            help: {
                name: '',
                url: '',
                rank: '',
                parentId: '',
                isEnable: '',
            },
            buttonDisabled: true,
        };
    }

    componentWillMount() {
        this.setState({
            id: "",
            name: "",
            url: "",
            rank: "1",
            parentId: "",
            isEnable: "1",
        });
        const content = this.props.modalDialog.dialog.content;
        if(content){
            const id = content.id;
            this.setState({
                hasFeedback: {
                    name: true,
                    rank: true,
                    parentId: true,
                },
                validateStatus: {
                    name: 'success',
                    rank: 'success',
                    parentId: 'success',
                },
            });
            this.props.modalDialog.findInfoById(id);
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
                this.props.modalDialog.save(values);
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

    componentWillReceiveProps(nextProps){
        const content = this.props.modalDialog.dialog.content;
        if(!content){
            const parentMenus = nextProps.modalDialog.parentMenus;
            if(parentMenus){
                this.setState({
                    parentId: parentMenus.list[0].id,
                })
            }
        }else{
            const info = nextProps.modalDialog.info;
            if(info && info.render){
                this.props.modalDialog.findMenuByRank(info.rank-1);
                let isEnable = "";
                if(info.isEnable){
                    isEnable = "1";
                }else{
                    isEnable = "1";
                }
                this.setState({
                    id: info.id,
                    name: info.name,
                    url: info.url,
                    rank: info.rank+"",
                    parentId: info.parentId,
                    isEnable: isEnable,
                });
                info.render = false;
            }
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const title = this.props.modalDialog.dialog.title + '菜单';
        const parentMenus = this.props.modalDialog.parentMenus;
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
                                    initialValue: this.state.id,
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
                                initialValue: this.state.name,
                            })(
                                <Input type='text' placeholder="请输入菜单名称"/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="URL"
                            hasFeedback={this.state.hasFeedback.url}
                            validateStatus={this.state.validateStatus.url}
                            help={this.state.help.url}
                        >
                            {getFieldDecorator('url',{
                                rules: [{
                                    required: true,
                                    validator: this.validateInputField.bind(this,'url','请输入URL!'),
                                }],
                                initialValue: this.state.url,
                            })(
                                <Input type='text' placeholder="请输入URL"/>
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
                                initialValue: this.state.rank,
                            })(
                                <DictSelect
                                    category="MENU_RANK"
                                    placeholder="请选择菜单等级"
                                    onChange={this.onChange.bind(this)}
                                />
                            )}
                        </Form.Item>

                        {this.state.rank != 1 && parentMenus?
                            <Form.Item
                                label="上级菜单"
                                hasFeedback={this.state.hasFeedback.parentId}
                                validateStatus={this.state.validateStatus.parentId}
                                help={this.state.help.parentId}
                            >
                                {getFieldDecorator('parentId',{
                                    rules: [{
                                        required: true, message: '请选择上级菜单!',
                                    }],
                                    initialValue: this.state.parentId,
                                })(
                                    <CommSelect
                                        items={parentMenus.list}
                                        placeholder="请选择上级菜单"
                                    />
                                )}
                            </Form.Item>
                            :
                            ""
                        }

                        <Form.Item
                            label="是否可用"
                            hasFeedback={this.state.hasFeedback.isEnable}
                            validateStatus={this.state.validateStatus.isEnable}
                            help={this.state.help.isEnable}
                        >
                            {getFieldDecorator('isEnable',{
                                rules: [{
                                    required: true, message: '请选择是否可用!',
                                }],
                                initialValue: this.state.isEnable,
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