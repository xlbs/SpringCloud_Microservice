package com.xlbs.zuulservice;

//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.SpringApplicationConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;


import org.apache.commons.codec.digest.DigestUtils;

//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(classes = WebserviceApplication.class)
//@WebAppConfiguration
public class WebserviceApplicationTests {


    public static void main(String[] args) {

        System.out.println(DigestUtils.sha1Hex("888888"));
    }

//    @Test
//    public void contextLoads() {
//    }

}
