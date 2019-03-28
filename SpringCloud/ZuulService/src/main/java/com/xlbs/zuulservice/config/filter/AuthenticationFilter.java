package com.xlbs.zuulservice.config.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import com.xlbs.constantjar.RepStateCode;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class AuthenticationFilter extends ZuulFilter implements InitializingBean, ApplicationContextAware {

    private Logger logger = Logger.getLogger(AuthenticationFilter.class);

    private ApplicationContext applicationContext;

    @Autowired
    private I_AuthenticationService authenticationService;

    @Override
    public String filterType() {
        return FilterConstants.PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() throws ZuulException {
        HttpServletRequest request = RequestContext.getCurrentContext().getRequest();
        String uri = request.getRequestURI();
        System.out.println("==>ZuulFilter中拦截器的URI: "+uri );
        if(authenticationService.authenticate()){
            return null;
        }else{
            throw new ZuulException("SESSION超时，请求被禁用", RepStateCode.getCode("SESSION_TIME_OUT"), RepStateCode.getMsg("SESSION_TIME_OUT"));
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("==> 拦截器：ZuulFilter Init Success");
        logger.info("==> ZuulFilter Init Success");
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
