package com.xlbs.apiservice.dao.intf;

import com.xlbs.constantjar.obj.User;

import java.util.List;
import java.util.Map;

public interface I_UserDao {

    /**
     * 查询所有用户信息
     * @return
     */
    public List<Map<Object,Object>> findAllUser();

    /**
     * 通过userId查询用户信息
     * @param userId 用户Id
     * @return
     */
    public User findUserByUserId(Long userId);

    /**
     * 通过userName查询用户信息
     * @param userName 用户编号
     * @return
     */
    public User findUserByUserName(String userName);

    /**
     * 通过name查询用户信息
     * @param name 用户名
     * @return
     */
    public User findUserByName(String name);





}
