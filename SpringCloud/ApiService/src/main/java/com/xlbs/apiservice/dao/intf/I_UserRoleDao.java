package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.UserRole;

import java.util.List;

public interface I_UserRoleDao {

    /**
     * 通过userId查询用户的角色信息
     * @param userId 用户ID
     * @return
     */
    public List<Role> findRolesByUserId(Long userId);


    /**
     * 批量保存用户角色信息
     * @param userRoles
     */
    public void saveUserRoles(List<UserRole> userRoles);

    /**
     * 删除用户角色信息
     * @param userId 用户ID
     */
    public void deleteUserRolesByUserId(Long userId);





}
