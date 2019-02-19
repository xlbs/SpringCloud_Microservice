package com.xlbs.blogservice.controller.comm;

import com.xlbs.blogservice.service.comm.I_CommService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommController {

    @Autowired
    private I_CommService commService;


}
