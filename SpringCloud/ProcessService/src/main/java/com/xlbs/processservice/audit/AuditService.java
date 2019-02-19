package com.xlbs.processservice.audit;

import com.xlbs.commutils.task.async.AsyncTask;
import com.xlbs.commutils.task.async.AsyncTaskContext;
import com.xlbs.commutils.utils.RandomCodeUtils;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class AuditService {

    /**
     * 创建审核流程
     *
     * @param audit     审核对象
     * @param variables 流程变量
     * @return
     */
    public Audit createAudit(Audit audit, Map<String, Object> variables) {
        AuditTask auditTask = new AuditTask(audit, variables);
        AsyncTask asyncTask = new AsyncTask(RandomCodeUtils.getRandomId(), auditTask, AuditTaskHandler.class);
        AsyncTaskContext.addAsyncTask(asyncTask);
        return audit;
    }


}
