package com.xlbs.blogservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableEurekaClient
@EnableTransactionManagement//开启事务管理
public class BlogserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogserviceApplication.class, args);
    }
}
