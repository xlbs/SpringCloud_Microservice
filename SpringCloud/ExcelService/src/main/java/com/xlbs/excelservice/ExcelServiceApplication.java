package com.xlbs.excelservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(value = "com.xlbs.commutils")
@ComponentScan(value = "com.xlbs.excelservice")
public class ExcelServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExcelServiceApplication.class, args);
    }

}

