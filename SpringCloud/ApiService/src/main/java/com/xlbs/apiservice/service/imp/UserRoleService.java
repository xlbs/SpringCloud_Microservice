package com.xlbs.apiservice.service.imp;

import com.xlbs.apiservice.dao.intf.I_UserRoleDao;
import com.xlbs.apiservice.service.intf.I_UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleService implements I_UserRoleService {

    @Autowired
    private I_UserRoleDao userRoleDao;

}
