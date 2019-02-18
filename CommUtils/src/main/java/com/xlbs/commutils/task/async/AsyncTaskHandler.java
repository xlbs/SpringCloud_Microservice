package com.xlbs.commutils.task.async;

public interface AsyncTaskHandler<T> {

    void handle(T argument);
}
