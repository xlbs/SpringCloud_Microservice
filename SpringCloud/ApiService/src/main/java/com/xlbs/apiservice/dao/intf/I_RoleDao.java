package com.xlbs.apiservice.dao.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;

import java.util.List;


public interface I_RoleDao {

    /**
     * 分页查找
     * @param query 条件
     * @return 菜单列表
     */
    public PageInfo<Role> find(RoleQuery query);

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    public Role findById(Long id);

    /**
     * 保存对象
     * @param obj 对象
     */
    public void save(Role obj);

    /**
     * 更新对象
     * @param obj 对象
     */
    public void update(Role obj);

    /**
     * 删除对象
     * @param id 标识
     */
    public void delete(Long id);

    /**
     *查询所有角色
     * @return 角色列表
     */
    public List<Role> findAll();

}
