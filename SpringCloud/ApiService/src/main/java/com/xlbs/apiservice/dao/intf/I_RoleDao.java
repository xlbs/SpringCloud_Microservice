package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.Role;

import java.util.List;

public interface I_RoleDao {

    /**
     *查询角色信息
     * @return
     */
    public List<Role> findRoles();

    /**
     * 通过userId查询用户的角色信息
     * @param userId 用户ID
     * @return
     */
    public List<Role> findRolesByUserId(Long userId);


    /**
     * 批量保存角色信息
     * @param roles
     */
    public void saveUserRoles(List<Role> roles);





}
