package com.xlbs.apiservice.service.imp;

import com.xlbs.apiservice.dao.intf.I_JobDao;
import com.xlbs.apiservice.service.intf.I_JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobServicer implements I_JobService {

    @Autowired
    private I_JobDao jobDao;


}
