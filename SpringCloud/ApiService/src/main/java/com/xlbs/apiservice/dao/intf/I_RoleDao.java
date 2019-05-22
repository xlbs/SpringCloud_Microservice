package com.xlbs.apiservice.dao.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;

import java.util.List;


public interface I_RoleDao {

    /**
     * 查询角色列表信息
     * @return
     */
    public PageInfo<Role> findList(RoleQuery roleQuery);

    /**
     * 通过角色Id查询角色信息
     * @param id 角色Id
     * @return
     */
    public Role findRoleById(Long id);


    /**
     * 保存角色
     * @param role 角色
     */
    public void saveRole(Role role);

    /**
     * 更新角色
     * @param role 角色
     */
    public void updateRole(Role role);

    /**
     * 删除角色
     * @param id 角色Id
     */
    public void deleteRoleById(Long id);

    /**
     *查询角色信息
     * @return
     */
    public List<Role> findRoles();

}
