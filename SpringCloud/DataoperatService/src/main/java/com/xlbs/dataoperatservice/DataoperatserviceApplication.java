package com.xlbs.dataoperatservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.transaction.annotation.EnableTransactionManagement;

//@EnableDiscoveryClient//创建针对Eureka客户端的实例
@SpringBootApplication//启动SpringBoot应用程序
@EnableEurekaClient
@EnableTransactionManagement//开启事务管理
public class DataoperatserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DataoperatserviceApplication.class, args);

    }
}
