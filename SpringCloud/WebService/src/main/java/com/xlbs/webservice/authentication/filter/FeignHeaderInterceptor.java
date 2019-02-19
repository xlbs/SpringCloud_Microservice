package com.xlbs.webservice.authentication.filter;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Component
public class FeignHeaderInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate requestTemplate) {
        System.out.println("FeignHeaderInterceptor 中拦截的URL："+requestTemplate.request().url());
//        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
//        HttpSession session = request.getSession();
//        requestTemplate.header(RequestContextUtils.USER_ID, session.getAttribute(RequestContextUtils.USER_ID).toString());
//        requestTemplate.header(RequestContextUtils.USER_NAME, session.getAttribute(RequestContextUtils.USER_NAME).toString());
//        requestTemplate.header(RequestContextUtils.USER_NO, session.getAttribute(RequestContextUtils.USER_NAME).toString());
    }


}
