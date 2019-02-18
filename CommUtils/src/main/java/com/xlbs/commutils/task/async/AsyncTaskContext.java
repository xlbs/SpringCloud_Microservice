package com.xlbs.commutils.task.async;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class AsyncTaskContext implements ApplicationContextAware {

    private static final ThreadLocal<List<AsyncTask>> LOCAL = new ThreadLocal<>();

    public static void initialize(){
        LOCAL.set(new ArrayList<>());
    }

    public static List<AsyncTask> asyncTasks(){
        return LOCAL.get();
    }

    public static void addAsyncTask(AsyncTask asyncTask){
        List<AsyncTask> asyncTasks = asyncTasks();
        if(Objects.isNull(asyncTasks)){
            throw new IllegalStateException("Please add asynchronousTask annotation to application service method");
        }
        asyncTasks.add(asyncTask);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

    }

    public static void clear(){
        LOCAL.remove();
    }


}
