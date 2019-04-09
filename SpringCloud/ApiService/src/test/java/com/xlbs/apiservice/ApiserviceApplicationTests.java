package com.xlbs.apiservice;

//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.SpringApplicationConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;

import com.xlbs.commutils.utils.RandomCodeUtils;
import org.apache.commons.codec.binary.Base64;

//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(classes = ApiserviceApplication.class)
//@WebAppConfiguration
public class ApiserviceApplicationTests {

    public static void main(String[] args) {
        String a = "kdfd123";
        String b = new String(Base64.encodeBase64(a.getBytes()));
        System.out.println(b);
        System.out.println(new String(Base64.decodeBase64(b.getBytes())));
        System.out.println(RandomCodeUtils.getRandomId());
    }

//    @Test
//    public void contextLoads() {
//    }

}
