package com.xlbs.blogservice.service.comm;

import com.xlbs.blogservice.dao.comm.I_CommDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CommService implements I_CommService {

    @Autowired
    private I_CommDao commDao;




}
