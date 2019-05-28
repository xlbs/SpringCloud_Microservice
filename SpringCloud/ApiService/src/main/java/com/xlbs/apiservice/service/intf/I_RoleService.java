package com.xlbs.apiservice.service.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;

import java.util.List;

public interface I_RoleService {

    /**
     * 分页查找
     * @param roleQuery 条件
     * @return 分页结果对象
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
     * @param isEdit 是否编辑
     */
    public void save(Role role, Boolean isEdit);

    /**
     * 删除对象
     * @param id 标识
     */
    public void delete(Long id);

    /**
     * 查找角色信息
     * @return
     */
    public List<Role> findRoles();


}
