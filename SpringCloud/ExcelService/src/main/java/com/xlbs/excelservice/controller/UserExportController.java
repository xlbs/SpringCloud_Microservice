package com.xlbs.excelservice.controller;

import com.xlbs.excelservice.service.intf.I_UserExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/user")
public class UserExportController {


    @Autowired
    private I_UserExportService userExportService;

    /**
     * 导出用户信息
     */
    @GetMapping(value = "/export")
    public void exportUserInfo(){
        userExportService.exportUserInfo();
    }




}
