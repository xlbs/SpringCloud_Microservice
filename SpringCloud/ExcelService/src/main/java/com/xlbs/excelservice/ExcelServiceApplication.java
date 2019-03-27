package com.xlbs.excelservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableFeignClients
@ComponentScan(value = "com.xlbs.commutils")
@ComponentScan(value = "com.xlbs.excelservice")
public class ExcelServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExcelServiceApplication.class, args);
    }

}

