package com.xlbs.commutils.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringUtils implements ApplicationContextAware {

    private static ApplicationContext appCtx;

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        appCtx = applicationContext;
    }

    public static <T> T getBean(String beanName, Class<T> requiredType){
        return appCtx.getBean(beanName, requiredType);
    }

    public static <T> T getBean(Class<T> requiredType){
        return appCtx.getBean(requiredType);
    }


}
