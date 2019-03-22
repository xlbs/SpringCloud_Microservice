package com.xlbs.commutils.task.async;

import com.xlbs.constantjar.RequestContextUtils;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class AsyncTaskExecutor implements DisposableBean {

    private final ExecutorService executor = Executors.newSingleThreadExecutor(r -> new Thread(r,"AsyncTask-Thread"));

    public  void execute(List<AsyncTask> asyncTasks){
        executor.submit(() -> {
            for (AsyncTask asyncTask : asyncTasks){
                RequestContextUtils.set(asyncTask.getRequestContext());
                try {
                    asyncTask.run();
                }catch (Throwable e){
                    asyncTask.fail(e.getMessage());
                    continue;
                }finally {
                    RequestContextUtils.clear();
                }
            }

        });

    }

    @Override
    public void destroy() throws Exception {
        executor.shutdown();
    }


}
