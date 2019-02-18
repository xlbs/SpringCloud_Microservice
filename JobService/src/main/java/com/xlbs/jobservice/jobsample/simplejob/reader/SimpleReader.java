package com.xlbs.jobservice.jobsample.simplejob.reader;

import com.xlbs.jobservice.jobsample.simplejob.entity.SimpleEntity;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

public class SimpleReader implements ItemReader<SimpleEntity> {

    private boolean jobEnd = false;

    public SimpleEntity read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        if(!jobEnd){
            System.out.println("SimpleJob 读数据开始...");
            SimpleEntity simpleEntity = new SimpleEntity();
            jobEnd = true;
            return simpleEntity;
        }
        System.out.println("SimpleJob 任务执行完成，即将结束、停止...");
        return null;
    }
}
