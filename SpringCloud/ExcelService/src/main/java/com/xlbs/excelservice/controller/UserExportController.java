package com.xlbs.excelservice.controller;

import com.xlbs.constantjar.ResponseResult;
import com.xlbs.excelservice.feign.ApiServiceFeignClient;
import com.xlbs.excelservice.service.intf.I_UserExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/user")
public class UserExportController extends ResponseResult {


    @Autowired
    private I_UserExportService userExportService;

    @Autowired
    private ApiServiceFeignClient apiServiceFeignClient;

    /**
     * 导出用户信息
     */
    @GetMapping(value = "/export")
    public ResponseResult exportUserInfo(){
        return userExportService.exportUserInfo();
    }

    @GetMapping(value = "/ddd")
    public void exportUserInfoddd(){
        apiServiceFeignClient.userExport();
    }




}
