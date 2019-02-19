package com.xlbs.blogservice.service.home;

import com.xlbs.blogservice.dao.home.I_HomeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class HomeService implements I_HomeService {

    @Autowired
    private I_HomeDao homeDao;




}
