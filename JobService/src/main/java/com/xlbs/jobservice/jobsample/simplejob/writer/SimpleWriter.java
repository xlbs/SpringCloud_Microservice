package com.xlbs.jobservice.jobsample.simplejob.writer;

import com.xlbs.jobservice.HttpClientUtils;
import com.xlbs.jobservice.jobsample.simplejob.entity.SimpleEntity;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.List;

public class SimpleWriter implements ItemWriter<SimpleEntity> {

    @Autowired
    private HttpClientUtils httpClientUtils;

    private String url = null;

    public SimpleWriter(@Value("${webservice.index}") String path){
        this.url = String.format("%s/simpleJob", path);
    }

    public void write(List<? extends SimpleEntity> list) throws Exception {
        System.out.println("SimpleJob 写数据开始...");
        String result = httpClientUtils.sendPostResquest(url, new HashMap<String, String>());
        System.out.println("SimpleJob 写数据结束...");
        System.out.println("SimpleJob 执行结果："+result);
    }

}
