package com.xlbs.processservice.audit;

import com.xlbs.commutils.obj.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class Audit extends Entity {

    private String procInstid;

    private Long applyId;

    private String status;

    private LocalDate firstSubmitDate;

    private LocalDate lastSubmitDate;

}
