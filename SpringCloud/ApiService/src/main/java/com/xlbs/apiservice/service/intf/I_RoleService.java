package com.xlbs.apiservice.service.intf;

import com.xlbs.apiservice.entity.Role;

import java.util.List;

public interface I_RoleService {

    /**
     * 查找角色信息
     * @return
     */
    public List<Role> findRoles();


}
