package com.xlbs.processservice.audit;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class AuditTask {

    private Audit audit;

    private Map<String, Object> variables;

    public AuditTask() {
        super();
    }

    public AuditTask(Audit audit, Map<String, Object> variables) {
        this.audit = audit;
        this.variables = variables;
    }
}
