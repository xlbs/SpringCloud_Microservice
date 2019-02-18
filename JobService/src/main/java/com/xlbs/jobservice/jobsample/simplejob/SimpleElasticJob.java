package com.xlbs.jobservice.jobsample.simplejob;

import com.dangdang.ddframe.job.api.ShardingContext;
import com.dangdang.ddframe.job.api.simple.SimpleJob;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SimpleElasticJob implements SimpleJob {

    public void execute(ShardingContext shardingContext) {
        System.out.println(String.format("TestElasticJob: Thread ID: %s, 任务总片数: %s, 当前分片项: %s", Thread.currentThread().getId(),shardingContext.getShardingTotalCount(),shardingContext.getShardingItem()));
        // 获取配置文件
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"classpath:/config/spring-batch.xml"});
        // 获取任务启动器
        JobLauncher jobLauncher = context.getBean(JobLauncher.class);
        Job job = context.getBean("simpleJob",Job.class);
        try {
            JobExecution result = jobLauncher.run(job, new JobParameters());
            System.out.println("SimpleJob Run Result: " + result.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }


}
