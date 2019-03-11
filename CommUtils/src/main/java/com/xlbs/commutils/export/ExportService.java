package com.xlbs.commutils.export;

import com.xlbs.commutils.constant.ExportStatus;
import com.xlbs.commutils.task.async.AsyncTask;
import com.xlbs.commutils.task.async.AsyncTaskContext;
import com.xlbs.commutils.utils.RandomCodeUtils;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class ExportService {

    public <T>void export(String name, int type, Date date, String contentType, T argument, Class<? extends Export> export){
        ExportTask<T> exportTask = new ExportTask<>(RandomCodeUtils.getRandomId(), name, type, ExportStatus.EXPORTING, date, contentType, argument, export);
        AsyncTask<ExportTask> asyncTask = new AsyncTask<>(RandomCodeUtils.getRandomId(), exportTask, ExportTaskHandler.class, false);
        AsyncTaskContext.addAsyncTask(asyncTask);
    }

    public String getFileName(String fileNmae, Date date){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSSS");
        return String.format("%s-%s.xlsx", fileNmae, sdf.format(date));
    }
}
