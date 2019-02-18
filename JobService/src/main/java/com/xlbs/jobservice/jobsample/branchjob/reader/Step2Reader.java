package com.xlbs.jobservice.jobsample.branchjob.reader;

import com.xlbs.jobservice.jobsample.branchjob.entity.BranchEntity;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

public class Step2Reader implements ItemReader<BranchEntity> {

    private boolean jobEnd = false;

    public BranchEntity read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        System.out.println("Step2Reader jobEnd："+jobEnd);
        if(!jobEnd){
            System.out.println("Step2Reader 读数据开始...");
            BranchEntity branchEntity = new BranchEntity();
            jobEnd = true;
            return branchEntity;
        }
//        jobEnd = false;
        return null;
    }


}
