package com.xlbs.webservice.authentication.filter;

import com.xlbs.constantjar.RequestContextUtils;
import com.xlbs.constantjar.SessionConstant;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Component;

@Component
public class FeignHeaderInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate requestTemplate) {
        System.out.println("FeignHeaderInterceptor 中拦截的URL："+requestTemplate.request().url());
        requestTemplate.header(SessionConstant.USER_ID, RequestContextUtils.getUserId().toString());
        requestTemplate.header(SessionConstant.USERNAME, RequestContextUtils.getUsername());
        requestTemplate.header(SessionConstant.NAME, RequestContextUtils.getName());
        requestTemplate.header(SessionConstant.USER_TYPE, RequestContextUtils.getUserType().toString());
    }


}
