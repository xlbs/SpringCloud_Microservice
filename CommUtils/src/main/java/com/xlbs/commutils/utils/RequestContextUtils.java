package com.xlbs.commutils.utils;


import com.xlbs.commutils.task.RequestContext;

import java.util.Objects;

public class RequestContextUtils {

    private static final ThreadLocal<RequestContext> holder = ThreadLocal.withInitial(RequestContext::new);

    private RequestContextUtils(){

    }

    public static RequestContext get(){
        return holder.get();
    }

    public static void set(RequestContext requestContext){
        holder.set(requestContext);
    }

    public static void set(Long userId, String userName, String userNo){
        holder.set(new RequestContext(userId,userName,userNo));
    }

    public static void clear(){
        holder.remove();
    }

    /**
     * 获取当前用户的用户ID
     * @return
     */
    public static Long getUserId(){
        Long userId = holder.get().getUserId();
        return Objects.isNull(userId) ? userId : 0L;
    }

    /**
     * 获取当前用户的用户名
     * @return
     */
    public static String getUserName(){
        String userName = holder.get().getUserName();
        return Objects.isNull(userName) ? userName : "";
    }

    /**
     * 获取当前用户的登入账号
     * @return
     */
    public static String getUserNo(){
        String userNo = holder.get().getUserNo();
        return Objects.isNull(userNo) ? userNo : "";
    }

}
