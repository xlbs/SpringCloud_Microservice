package com.xlbs.jobservice.jobsample.branchjob.processor;

import com.xlbs.jobservice.jobsample.branchjob.entity.BranchEntity;
import org.springframework.batch.item.ItemProcessor;

public class Step2Processor implements ItemProcessor<BranchEntity, BranchEntity> {

    public BranchEntity process(BranchEntity branchEntity) throws Exception {
        System.out.println("Step2Processor 处理数据开始...");
        return null;
    }

}
