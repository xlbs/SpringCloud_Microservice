package com.xlbs.dataoperatservice.service.user.intf;

import com.xlbs.commutils.obj.User;

import java.util.List;
import java.util.Map;

public interface I_UserService {

    /**
     * 查询所有用户信息
     * @return
     */
    public List<Map> findAllUser();

    /**
     * 通过userId查询用户信息
     * @param userId 用户Id
     * @return
     */
    public User findUserByUserId(Integer userId);

    /**
     * 通过userNo查询用户信息
     * @param userNo 用户编号
     * @return
     */
    public User findUserByUserNo(String userNo);

    /**
     * 通过userName查询用户信息
     * @param userName 用户名
     * @return
     */
    public User findUserByUserName(String userName);


}
