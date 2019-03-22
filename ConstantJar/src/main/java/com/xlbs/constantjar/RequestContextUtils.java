package com.xlbs.constantjar;

import com.xlbs.constantjar.obj.RequestContext;

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

    public static void set(Long userId, String username, String name, Integer userType){
        holder.set(new RequestContext(userId,username,name,userType));
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
        return !Objects.isNull(userId) ? userId : 0L;
    }

    /**
     * 获取当前用户的用户名
     * @return
     */
    public static String getUsername(){
        String username = holder.get().getUsername();
        return !Objects.isNull(username) ? username : "";
    }

    /**
     * 获取当前用户姓名
     * @return
     */
    public static String getName(){
        String name = holder.get().getName();
        return !Objects.isNull(name) ? name : "";
    }

    /**
     * 获取当前用户类型
     * @return
     */
    public static Integer getUserType(){
        Integer userType = holder.get().getUserType();
        return !Objects.isNull(userType) ? userType : 0;
    }


}
