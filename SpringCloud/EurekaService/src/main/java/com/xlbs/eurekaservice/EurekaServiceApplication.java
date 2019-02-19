package com.xlbs.eurekaservice;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class EurekaServiceApplication {

    public static void main(String[] args) {
//        SpringApplication.run(EurekaserviceApplication.class, args);
        new SpringApplicationBuilder(EurekaServiceApplication.class).web(true).run(args);
    }
}
