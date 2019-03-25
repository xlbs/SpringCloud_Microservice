package com.xlbs.constantjar;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter @Getter
public class ResponseResult implements Serializable {

    private static final long serialVersionUID = -3948389268046368059L;

    private Integer code;//状态码

    private String msg;//消息

    private Object data;//数据

    private void setResultCode(ResponseCode code) {
        this.code = code.code();
        this.msg = code.msg();
    }

    //成功 直接返回状态码
    public static ResponseResult success() {
        ResponseResult result = new ResponseResult();
        result.setResultCode(ResponseCode.SUCCESS);
        return result;
    }

    //成功 返回状态码 及 数据
    public static ResponseResult success(Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(ResponseCode.SUCCESS);
        result.setData(data);
        return result;
    }

    //成功 自定义返回状态码
    public static ResponseResult success(ResponseCode resultCode) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        return result;
    }

    //成功 自定义返回状态码 及 数据
    public static ResponseResult success(ResponseCode resultCode, Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        result.setData(data);
        return result;
    }

    //失败 直接返回状态码
    public static ResponseResult failure() {
        ResponseResult result = new ResponseResult();
        result.setResultCode(ResponseCode.FAILURE);
        return result;
    }

    //成功 返回状态码 及 数据
    public static ResponseResult failure(Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(ResponseCode.FAILURE);
        result.setData(data);
        return result;
    }

    //失败 自定义返回状态码
    public static ResponseResult failure(ResponseCode resultCode) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        return result;
    }

    //失败 自定义返回状态码 及 数据
    public static ResponseResult failure(ResponseCode resultCode, Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        result.setData(data);
        return result;
    }




}
