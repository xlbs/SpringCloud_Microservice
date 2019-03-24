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

    private void setResultCode(ResultCode code) {
        this.code = code.code();
        this.msg = code.msg();
    }

    //成功 不返回数据直接返回成功信息
    public static ResponseResult success() {
        ResponseResult result = new ResponseResult();
        result.setResultCode(ResultCode.SUCCESS);
        return result;
    }

    //成功 并且加上返回数据
    public static ResponseResult success(Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(ResultCode.SUCCESS);
        result.setData(data);
        return result;
    }

    //成功 自定义成功返回状态 加上数据
    public static ResponseResult success(ResultCode resultCode, Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        result.setData(data);
        return result;
    }

    // 单返回失败的状态码
    public static ResponseResult failure(ResultCode resultCode) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        return result;
    }

    // 返回失败的状态码 及 数据
    public static ResponseResult failure(ResultCode resultCode, Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        result.setData(data);
        return result;
    }




}
