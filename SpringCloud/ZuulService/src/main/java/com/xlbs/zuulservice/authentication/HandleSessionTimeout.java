package com.xlbs.zuulservice.authentication;

import com.google.common.collect.ImmutableMap;
import org.apache.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class HandleSessionTimeout {

    @RequestMapping(value = "/sessionTimeOut")
    public HttpEntity sessionTimeOut(HttpServletRequest request) {
//        if(!isAjax(request)){
            return ResponseEntity.status(HttpStatus.SC_FORBIDDEN).body(ImmutableMap.of("status","session_timeout" , "message","会话超时，请重新登入"));
//        }
//        System.out.println("=======>>>>>>>sessionTimeOut");
//        return ResponseEntity.ok(true);
    }

    /**
     * 判断是否是ajax请求
     * @param request
     * @return
     */
    private Boolean isAjax(HttpServletRequest request){
        if ( request.getHeader("x-requested-with") != null
                && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){
            return true;
        }
        return false;
    }




}
