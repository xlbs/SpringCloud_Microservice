package com.xlbs.importexportservice.interceptor;

import com.xlbs.commutils.utils.RequestContextUtils;
import com.xlbs.constantjar.SessionConstant;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptorAdapter() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
                String uri = request.getRequestURI();
                System.out.println("==>WebMvcConfig中的拦截器URI: "+uri );
                Long userId = new Long(request.getHeader(SessionConstant.USER_ID));
                String username = request.getHeader(SessionConstant.USERNAME);
                String name = request.getHeader(SessionConstant.NAME);
                RequestContextUtils.set(userId, username, name);
                return true;
            }

            @Override
            public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
                RequestContextUtils.clear();
            }
        });
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        super.addResourceHandlers(registry);
    }


}
