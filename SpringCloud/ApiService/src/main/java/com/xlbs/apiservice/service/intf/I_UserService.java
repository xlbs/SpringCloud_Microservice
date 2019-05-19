package com.xlbs.apiservice.service.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.SignIn;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;

import java.util.List;
import java.util.Map;

public interface I_UserService {

    /**
     * 查询用户信息
     * @param userQuery 条件
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
     * 保存用户信息
     * @param user 用户信息
     */
    public void saveUserInfo(User user, Boolean isEdit);

    /**
     * 删除用户信息
     * @param id 用户ID
     */
    public void deleteUserInfo(Long id);

    /**
     * 导出用户信息
     * @return
     */
    public List<Map<Object,Object>> exportUser();


}
