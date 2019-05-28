package com.xlbs.apiservice.dao.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.query.UserQuery;

import java.util.List;
import java.util.Map;

public interface I_UserDao {

    /**
     * 分页查找
     * @param query 条件
     * @return 菜单列表
     */
    public PageInfo<User> find(UserQuery query);

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    public User findById(Long id);

    /**
     * 保存对象
     * @param obj 对象
     */
    public void save(User obj);

    /**
     * 更新对象
     * @param obj 对象
     */
    public void update(User obj);

    /**
     * 删除对象
     * @param id 标识
     */
    public void delete(Long id);

    /**
     * 导出用户信息
     * @return
     */
    public List<Map<Object,Object>> exportUser();





}
