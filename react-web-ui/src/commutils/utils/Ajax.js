import axios from 'axios';
import {showLoginBox} from "../actions/Login";

/**
 * ajax封装
 * @type {{get: Ajax.get, post: Ajax.post}}
 */
export const Ajax = {
    get: ({ url }, callBack, dispatch) => {
        axios.get(url)
            .then(function (response) {
                callBack && callBack(response);
            })
            .catch(function (error) {
                if(error.response && error.response.status==403 && error.response.data.message=='session_timeout'){//会话超时，请重新登入
                    dispatch(showLoginBox())//会话超时，弹出登入框
                }else if(error.response && error.response.status==500){//服务器异常
                    alert(error.response.data.message);
                }else{
                    callBack && callBack(error);
                }
            })
    },
    post: ({ url, params }, callBack, dispatch ) => {
        axios.post(url, params)
            .then(function (response) {
                callBack && callBack(response);
            })
            .catch(function (error) {
                if(error.response && error.response.status==403 && error.response.data.message=='session_timeout'){//会话超时，请重新登入
                    dispatch(showLoginBox())//会话超时，弹出登入框
                }else if(error.response && error.response.status==500){//服务器异常
                    alert(error.response.data.message);
                }else{
                    callBack && callBack(error);
                }
            })
    }
}


/**
 * transFormAjax封装
 * @type {{get: transFormAjax.get, post: transFormAjax.post}}
 */
export const transFormAjax = {
    get: ({ url }, callBack) => {
        axios({
            method: 'get',
            url: url,
            data: params,
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
        }).then(function (response) {
            callBack && callBack(response);
        }).catch(function (error) {
            if(error.response && error.response.status==500){//服务器异常
                alert(error.response.data.message);
            }else{
                callBack && callBack(error);
            }
        })
    },
    post: ({ url, params }, callBack) => {
        axios({
            method: 'post',
            url: url,
            data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
        }).then(function (response) {
            callBack && callBack(response);
        }).catch(function (error) {
            if(error.response && error.response.status==500){//服务器异常
                alert(error.response.data.message);
            }else{
                callBack && callBack(error);
            }
        })
    }
}

/**
 * AjaxPromise封装
 * @param url
 * @param config
 * @returns {Promise<any>}
 * @constructor
 */
export function AjaxPromise(url, config) {
    const request = {
        params: { rand: Math.random() }
    };
    if(!config){
        request.url = url;
        request.method = 'GET';
    }else {
        request.url = url;
        request.method = config.method;
        if(config.headers){
            request.headers = config.headers;
        }
        if(config.params){
            request.params = Object.assign(request.params, config.params);
        }
        if(config.auth){
            request.auth = config.auth;
        }
        if(config.data){
            request.data = config.data;
        }
        
        return new Promise((resolve, reject) => {
            axios(request).then(
                function (response) {
                    resolve(response.data);
                }
            ).catch(
                function (error) {
                    if(error.response.status == 500){
                        reject("服务器异常，请稍后重试")
                    }else{
                        reject(error)
                    }
                }
            )
        })

    }

}

