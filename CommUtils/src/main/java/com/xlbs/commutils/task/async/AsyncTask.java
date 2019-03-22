package com.xlbs.commutils.task.async;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xlbs.commutils.constant.TaskType;
import com.xlbs.constantjar.obj.RequestContext;
import com.xlbs.commutils.task.Task;
import com.xlbs.constantjar.RequestContextUtils;
import com.xlbs.commutils.utils.SpringUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class AsyncTask<T> extends Task<T> {

    @JsonIgnore
    private Class<? extends AsyncTaskHandler> asyncTaskHandler;

    public AsyncTask(long taskId, T argument, RequestContext requestContext, Class<? extends AsyncTaskHandler> asyncTaskHandler, boolean retry){
        super(taskId,argument,retry,TaskType.ASYNC_TASK,asyncTaskHandler.getName(),requestContext);
        setAsyncTaskHandler(asyncTaskHandler);
    }

    public AsyncTask(long taskId, T argument, Class<? extends AsyncTaskHandler> asyncTaskHandler){
        this(taskId, argument, RequestContextUtils.get(), asyncTaskHandler, true);
    }

    public AsyncTask(long taskId, T argument, Class<? extends AsyncTaskHandler> asyncTaskHandler, boolean retry){
        this(taskId, argument, RequestContextUtils.get(), asyncTaskHandler, retry);
    }

    public AsyncTask(long taskId, T argument, RequestContext requestContext, Class<? extends AsyncTaskHandler> asyncTaskHandler){
        this(taskId, argument, requestContext, asyncTaskHandler, true);
    }

    @Override
    public void run() {
        super.run();
        SpringUtils.getBean(asyncTaskHandler).handle(getArgument());
    }
}
