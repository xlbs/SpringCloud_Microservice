package com.xlbs.apiservice.dao.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;

import java.util.List;
import java.util.Map;

public interface I_UserDao {

    /**
     * 通过username查询用户信息
     * @param username 用户编号
     * @return
     */
    public User findUserByUsername(String username);

    /**
     * 查询用户信息
     * @return
     */
    public PageInfo<Map<Object, Object>> findUserList(UserQuery userQuery);

    /**
     * 保存用户
     * @param user 用户
     */
    public Long saveUser(User user);

    /**
     * 导出用户信息
     * @return
     */
    public List<Map<Object,Object>> exportUser();





}
