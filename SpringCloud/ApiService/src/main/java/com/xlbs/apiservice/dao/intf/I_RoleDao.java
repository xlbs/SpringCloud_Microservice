package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.Role;

import java.util.List;


public interface I_RoleDao {

    /**
     *查询角色信息
     * @return
     */
    public List<Role> findRole();

}
