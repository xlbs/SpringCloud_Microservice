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
    public PageInfo<Map<Object, Object>> findUserList(UserQuery userQuery);

    /**
     * 通过userId查询用户信息
     * @param userId 用户ID
     * @return
     */
    public User findUserInfoByUserId(Long userId);

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
     * @param userId 用户Id
     */
    public void deleteUser(Long userId);

    /**
     * 导出用户信息
     * @return
     */
    public List<Map<Object,Object>> exportUser();





}
