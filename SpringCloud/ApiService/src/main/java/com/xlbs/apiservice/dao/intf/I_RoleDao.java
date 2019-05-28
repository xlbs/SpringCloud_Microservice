package com.xlbs.apiservice.dao.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;

import java.util.List;


public interface I_RoleDao {

    /**
     * 分页查找
     * @param roleQuery 条件
     * @return 菜单列表
     */
    public PageInfo<Role> find(RoleQuery roleQuery);

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    public Role findById(Long id);

    /**
     * 保存对象
     * @param role 对象
     */
    public void save(Role role);

    /**
     * 更新角色
     * @param role 角色
     */
    public void update(Role role);

    /**
     * 删除对象
     * @param id 标识
     */
    public void delete(Long id);

    /**
     *查询角色信息
     * @return
     */
    public List<Role> findRoles();

}
