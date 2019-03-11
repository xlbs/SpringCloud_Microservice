package com.xlbs.apiservice.service.imp;

import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.constantjar.obj.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService implements I_UserService {

    @Autowired
    private I_UserDao userDao;

    /**
     * 查询所有用户信息
     * @return
     */
    @Override
    public List<Map<Object,Object>> findAllUser() {
        return userDao.findAllUser();
    }

    /**
     * 通过userId查询用户信息
     * @param userId 用户Id
     * @return
     */
    @Override
    public User findUserByUserId(Long userId) {
        return userDao.findUserByUserId(userId);
    }

    /**
     * 通过userName查询用户信息
     * @param userName 用户编号
     * @return
     */
    @Override
    public User findUserByUserName(String userName) {
        return userDao.findUserByUserName(userName);
    }

    /**
     * 通过name查询用户信息
     * @param name 用户名
     * @return
     */
    @Override
    public User findUserByName(String name) {
        return userDao.findUserByName(name);
    }


}
