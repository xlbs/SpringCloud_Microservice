package com.xlbs.constantjar;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter @Getter
public class ResponseResult implements Serializable {

    private static final long serialVersionUID = -3948389268046368059L;

    private Integer code;//状态码

    private Boolean state;//状态

    private String msg;//消息

    private Object data;//数据

    private void setResultCode(RepStateCode code) {
        this.code = code.code();
        this.state = code.state();
        this.msg = code.msg();
    }

    //成功 直接返回 状态码
    public static ResponseResult success() {
        ResponseResult result = new ResponseResult();
        result.setResultCode(RepStateCode.SUCCESS);
        return result;
    }

    //成功 返回 状态码 及 数据
    public static ResponseResult success(Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(RepStateCode.SUCCESS);
        result.setData(data);
        return result;
    }

    //失败 直接返回 状态码
    public static ResponseResult failure() {
        ResponseResult result = new ResponseResult();
        result.setResultCode(RepStateCode.FAILURE);
        return result;
    }

    //失败 返回 状态码 及 数据
//    public static ResponseResult failure(Object data) {
//        ResponseResult result = new ResponseResult();
//        result.setResultCode(RepStateCode.FAILURE);
//        result.setData(data);
//        return result;
//    }

    //自定义返回 状态码
    public static ResponseResult custom(RepStateCode resultCode) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        return result;
    }

    //自定义返回 状态码 及 数据
    public static ResponseResult custom(RepStateCode resultCode, Object data) {
        ResponseResult result = new ResponseResult();
        result.setResultCode(resultCode);
        result.setData(data);
        return result;
    }


}
