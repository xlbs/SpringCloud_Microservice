package com.xlbs.jobservice.jobsample.branchjob.writer;

import com.xlbs.jobservice.jobsample.branchjob.entity.BranchEntity;
import org.springframework.batch.item.ItemWriter;
import java.util.List;

public class Step1Writer implements ItemWriter<BranchEntity> {

    public void write(List<? extends BranchEntity> list) throws Exception {
        System.out.println("Step1Writer 写数据开始...");
    }


}
