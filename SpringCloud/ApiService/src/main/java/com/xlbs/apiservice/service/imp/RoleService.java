package com.xlbs.apiservice.service.imp;

import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.service.intf.I_RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService implements I_RoleService {

    @Autowired
    private I_RoleDao roleDao;

    @Override
    public List<Role> findRole() {
        return roleDao.findRole();
    }

}
