package com.xlbs.importexportservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(value = "com.xlbs.commutils")
@ComponentScan(value = "com.xlbs.importexportservice")
public class ImportExportServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImportExportServiceApplication.class, args);
    }

}

