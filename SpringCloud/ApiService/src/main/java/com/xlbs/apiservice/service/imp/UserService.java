package com.xlbs.apiservice.service.imp;

import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserInfo;
import com.xlbs.apiservice.service.intf.I_UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService implements I_UserService {

    @Autowired
    private I_UserDao userDao;


    @Override
    public List<User> findAllUser() {
        return userDao.findAllUser();
    }

    @Override
    public User findUserByUserId(Long userId) {
        return userDao.findUserByUserId(userId);
    }

    @Override
    public User findUserByUsername(String username) {
        return userDao.findUserByUsername(username);
    }

    @Override
    public User findUserByName(String name) {
        return userDao.findUserByName(name);
    }

    @Override
    public List<UserInfo> findUserList() {
        return userDao.findUserList();
    }

    @Override
    public List<Map<Object, Object>> exportUser() {
        return userDao.exportUser();
    }


}
