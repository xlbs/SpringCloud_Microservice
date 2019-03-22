package com.xlbs.commutils.task;

import com.xlbs.commutils.constant.TaskStatus;
import com.xlbs.constantjar.obj.RequestContext;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@NoArgsConstructor
@Getter @Setter
public abstract class Task<T> {

    private long taskId;

    private int status;

    private T argument;

    private Date creationDate;

    private Date lastModifyDate;

    private boolean retry;

    private String type;

    private String handler;

    private String failMsg;

    private int retryCnt;

    private RequestContext requestContext;


    public Task(long taskId, T argument, boolean retry, String type, String handler, RequestContext requestContext) {
        this.taskId = taskId;
        this.argument = argument;
        this.retry = retry;
        this.type = type;
        this.handler = handler;
        this.requestContext = requestContext;
        this.creationDate = new Date();
        this.failMsg = "";
        this.status = TaskStatus.RUNING;
    }

    public void run(){
        setStatus(TaskStatus.RUNING);
        setRetryCnt(getRetryCnt()+1);
    }

    public void fail(String failMsg){
        setStatus(TaskStatus.FAILED);
        setFailMsg(failMsg);
        setLastModifyDate(new Date());
    }

    @Override
    public int hashCode() {
        return Objects.hash(taskId);
    }

    @Override
    public boolean equals(Object obj) {
        if(this==obj){
            return true;
        }
        if(obj==null || getClass()!=obj.getClass()){
            return false;
        }
        Task<?> task = (Task<?>) obj;
        return taskId == task.taskId;
    }
}
