package com.xlbs.apiservice.service.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.query.UserQuery;

import java.util.List;
import java.util.Map;

public interface I_UserService {

    /**
     * 分页查找
     * @param query 条件
     * @return 分页结果对象
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
     * @param isEdit 是否编辑
     */
    public void save(User obj, Boolean isEdit);

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
