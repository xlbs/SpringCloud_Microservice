package com.xlbs.processservice.service.imp;

import com.xlbs.processservice.dao.intf.I_CommDao;
import com.xlbs.processservice.service.intf.I_CommService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CommService implements I_CommService {

    @Autowired
    private I_CommDao commDao;


}
