package com.xlbs.jobservice.jobsample.billingjob.listener;

import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.listener.StepExecutionListenerSupport;

public class StepExecutionListener extends StepExecutionListenerSupport {

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        System.out.println(stepExecution.getStepName()+" 的状态："+stepExecution.getStatus());
        System.out.println(stepExecution.getStepName()+" 的跳过条数："+stepExecution.getSkipCount());
        System.out.println(stepExecution.getStepName()+" 的退出状态："+stepExecution.getExitStatus().getExitCode());
        return stepExecution.getExitStatus();
    }
}
