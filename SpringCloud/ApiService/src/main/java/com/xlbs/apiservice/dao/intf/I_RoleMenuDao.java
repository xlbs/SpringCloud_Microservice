package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.RoleMenu;

import java.util.List;

public interface I_RoleMenuDao {

    /**
     * 通过roleId查询角色的菜单信息
     * @param roleId 角色id
     * @return
     */
    public List<Menu> findMenusByRoleId(Long roleId);

    /**
     * 通过menuId查询角色的菜单信息
     * @param menuId 菜单id
     * @return
     */
    public List<Menu> findMenusByMenuId(Long menuId);


    /**
     * 删除角色菜单信息
     * @param roleId 角色id
     */
    public void deleteRoleMenuByRoleId(Long roleId);


    /**
     * 批量保存角色菜单信息
     * @param roleMenus
     */
    public void saveRoleMenus(List<RoleMenu> roleMenus);







}
