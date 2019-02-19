package com.xlbs.blogservice.controller.home;

import com.xlbs.blogservice.service.home.I_HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    private I_HomeService homeService;

    @RequestMapping(value = "/home",method={ RequestMethod.GET, RequestMethod.POST})
    public HttpEntity login(){
        System.out.println("Blog首页请求成功");
        return ResponseEntity.ok("Blog首页请求成功");

    }

    @RequestMapping(value = "/test",method={ RequestMethod.GET, RequestMethod.POST})
    public HttpEntity test(){
        System.out.println("Blog测试请求成功");
        return ResponseEntity.ok("Blog测试请求成功");

    }



}
