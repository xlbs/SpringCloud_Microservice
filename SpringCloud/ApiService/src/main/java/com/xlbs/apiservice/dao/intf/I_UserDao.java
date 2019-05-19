package com.xlbs.apiservice.dao.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;

import java.util.List;
import java.util.Map;

public interface I_UserDao {

    /**
     * 查询用户信息
     * @return
     */
    public PageInfo<User> findUserList(UserQuery userQuery);

    /**
     * 通过用户ID查询用户信息
     * @param id 用户ID
     * @return
     */
    public User findUserInfoById(Long id);

    /**
     * 保存用户
     * @param user 用户
     */
    public void saveUser(User user);

    /**
     * 更新用户
     * @param user 用户
     */
    public void updateUser(User user);

    /**
     * 删除用户
     * @param id 用户ID
     */
    public void deleteUserById(Long id);

    /**
     * 导出用户信息
     * @return
     */
    public List<Map<Object,Object>> exportUser();





}
