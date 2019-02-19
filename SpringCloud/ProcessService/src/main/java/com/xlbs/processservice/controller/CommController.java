package com.xlbs.processservice.controller;

import com.xlbs.processservice.service.intf.I_CommService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CommController {

    @Autowired
    private I_CommService commService;


}