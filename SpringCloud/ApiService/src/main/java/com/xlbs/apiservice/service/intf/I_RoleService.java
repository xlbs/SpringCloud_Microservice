package com.xlbs.apiservice.service.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;

import java.util.List;

public interface I_RoleService {

    /**
     * 查询角色列表信息
     * @param roleQuery 条件
     * @return
     */
    public PageInfo<Role> findList(RoleQuery roleQuery);

    /**
     * 通过角色ID查询角色信息
     * @param id 角色id
     * @return
     */
    public Role findRoleById(Long id);

    /**
     * 保存角色信息
     * @param role 角色信息
     */
    public void save(Role role, Boolean isEdit);

    /**
     * 删除角色信息
     * @param id 角色id
     */
    public void delete(Long id);

    /**
     * 查找角色信息
     * @return
     */
    public List<Role> findRoles();


}
