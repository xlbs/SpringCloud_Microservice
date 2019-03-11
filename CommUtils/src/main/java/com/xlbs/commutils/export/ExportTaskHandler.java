package com.xlbs.commutils.export;

import com.xlbs.commutils.task.async.AsyncTaskHandler;
import org.springframework.stereotype.Component;

@Component
public class ExportTaskHandler implements AsyncTaskHandler<ExportTask> {

    @Override
    public void handle(ExportTask exportTask) {
        exportTask.export();
    }
}
