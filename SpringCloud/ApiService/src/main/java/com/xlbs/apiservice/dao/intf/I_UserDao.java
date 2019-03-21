package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.User;

import java.util.List;

public interface I_UserDao {

    /**
     * 查询所有用户信息
     * @return
     */
    public List<User> findAllUser();

    /**
     * 通过userId查询用户信息
     * @param userId 用户Id
     * @return
     */
    public User findUserByUserId(Long userId);

    /**
     * 通过username查询用户信息
     * @param username 用户编号
     * @return
     */
    public User findUserByUsername(String username);

    /**
     * 通过name查询用户信息
     * @param name 用户名
     * @return
     */
    public User findUserByName(String name);





}
