package com.xlbs.commutils.task.async;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class AsyncTaskAspect {

    @Autowired
    private AsyncTaskExecutor executor;

    @Pointcut("@annotation(com.xlbs.commutils.task.async.AsynchronousTask)")
    public void asyncService(){}

    @Around("asyncService()")
    public Object interceptAsyncMethod(ProceedingJoinPoint pjp) throws Throwable{
        Object result;
        AsyncTaskContext.initialize();
        try {
            result = pjp.proceed();//执行目标方法
            executor.execute(AsyncTaskContext.asyncTasks());
        }catch (Throwable e){
            throw e;
        }finally {
            AsyncTaskContext.clear();
        }
        return result;
    }
}
