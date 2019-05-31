import React from 'react';
import { Modal } from 'antd';

export function showConfirm(msg, onOk, onCancel) {
    Modal.confirm({
        title: '系统提示',
        centered: true,//垂直居中显示
        maskClosable: false, //点击蒙层是否允许关闭
        content: msg,
        okText: '确定',
        cancelText: '取消',
        onOk() {
            if(onOk){
                onOk();
            }
        },
        onCancel() {
            if(onCancel){
                onCancel();
            }
        }
    });
}

export function showInfo(msg, onOk) {
    Modal.info({
        title: '系统提示',
        centered: true,//垂直居中显示
        maskClosable: false, //点击蒙层是否允许关闭
        content: msg,
        onOk() {
            if(onOk){
                onOk();
            }
        }
    });
}

export function showSuccess(msg, onOk) {
    Modal.success({
        title: '操作成功',
        centered: true,//垂直居中显示
        maskClosable: false, //点击蒙层是否允许关闭
        content: msg,
        onOk() {
            if(onOk){
                onOk();
            }
        }
    });
}

export function showError(msg, onOk) {
    Modal.error({
        title: '操作失败',
        centered: true,//垂直居中显示
        maskClosable: false, //点击蒙层是否允许关闭
        content: msg,
        onOk() {
            if(onOk){
                onOk();
            }
        }
    });
}

export function showWarning(msg, onOk) {
    Modal.warning({
        title: '系统提示',
        centered: true,//垂直居中显示
        maskClosable: false, //点击蒙层是否允许关闭
        content: msg,
        onOk() {
            if(onOk){
                onOk();
            }
        }
    });
}