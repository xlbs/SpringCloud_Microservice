package com.xlbs.importexportservice.controller;

import com.xlbs.importexportservice.service.intf.I_UserExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/export")
public class UserExportController {


    @Autowired
    private I_UserExportService userExportService;

    /**
     * 导出全部用户信息
     */
    @RequestMapping(value = "/exportUserInfo", method={RequestMethod.GET, RequestMethod.POST})
    public void exportUserInfo(){
        userExportService.exportUserInfo();

    }
}
