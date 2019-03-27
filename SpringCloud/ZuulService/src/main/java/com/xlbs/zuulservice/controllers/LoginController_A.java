package com.xlbs.zuulservice.controllers;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController_A {

    @RequestMapping(value = "/login_page",method={ RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
    public HttpEntity<String> againLogin(){
        System.out.println("login_page");
        return ResponseEntity.ok("login_page");
    }


}
