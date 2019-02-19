package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.service.intf.I_JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JobController {

    @Autowired
    private I_JobService jobService;

    @RequestMapping(value = "/simpleJob", method={RequestMethod.GET, RequestMethod.POST})
    public String simpleJob(){
        return "SimpleJOb执行成功";
    }



}
