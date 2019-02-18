package com.xlbs.jobservice.listener;

import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;

public class JobListener implements JobExecutionListener {

    @Override
    public void beforeJob(JobExecution jobExecution) {
        System.out.println("监听：Job执行前的操作......");

    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        System.out.println("监听：Job执行后的操作......");

    }
}
