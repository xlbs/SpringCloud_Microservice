package com.xlbs.zuulservice.authentication;

import org.springframework.security.web.session.SessionInformationExpiredEvent;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class SessionTimeoutExpiredStrategy implements SessionInformationExpiredStrategy {

    @Override
    public void onExpiredSessionDetected(SessionInformationExpiredEvent sessionInformationExpiredEvent) throws IOException, ServletException {
        HttpServletResponse response = sessionInformationExpiredEvent.getResponse();
        HttpServletRequest request = sessionInformationExpiredEvent.getRequest();
        if(isAjax(request)){
            response.getWriter().print("session_timeout");  //设置超时标识
            response.getWriter().close();
        }



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
