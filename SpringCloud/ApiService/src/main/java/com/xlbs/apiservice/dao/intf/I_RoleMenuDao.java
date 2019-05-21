package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.UserRole;

import java.util.List;

public interface I_RoleMenuDao {

    /**
     * 通过roleId查询角色的菜单信息
     * @param roleId 角色ID
     * @return
     */
    public List<Menu> findMenusByRoleId(Long roleId);


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
