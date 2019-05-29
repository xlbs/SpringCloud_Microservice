package com.xlbs.apiservice.service.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;

import java.util.List;

public interface I_RoleService {

    /**
     * 分页查找
     * @param query 条件
     * @return 分页结果对象
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
     * @param isEdit 是否编辑
     */
    public void save(Role obj, Boolean isEdit);

    /**
     * 删除对象
     * @param id 标识
     */
    public Boolean delete(Long id);

    /**
     * 查询所有菜角色
     * @return 角色列表
     */
    public List<Role> findAll();


}
