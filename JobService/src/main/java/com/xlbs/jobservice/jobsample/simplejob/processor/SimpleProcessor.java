package com.xlbs.jobservice.jobsample.simplejob.processor;

import com.xlbs.jobservice.jobsample.simplejob.entity.SimpleEntity;
import org.springframework.batch.item.ItemProcessor;

public class SimpleProcessor implements ItemProcessor<SimpleEntity, SimpleEntity> {

    public SimpleEntity process(SimpleEntity simpleEntity) throws Exception {
        System.out.println("SimpleJob 处理数据开始...");
        return null;
    }
}
