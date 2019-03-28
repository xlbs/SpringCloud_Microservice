package com.xlbs.apiservice.service.imp;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.commutils.utils.RandomCodeUtils;
import com.xlbs.constantjar.RequestContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class UserService implements I_UserService {

    @Autowired
    private I_UserDao userDao;


    @Override
    public User findUserByUsername(String username) {
        return userDao.findUserByUsername(username);
    }


    @Override
    public PageInfo<Map<Object, Object>> findUserList(UserQuery userQuery) {
        return userDao.findUserList(userQuery);
    }

    @Override
    @Transactional
    public void saveUser(User user) {
        Long id = RandomCodeUtils.getRandomId();
        user.setUserId(id);
        Long resId = userDao.saveUser(user);
        System.out.println(resId);
    }

    @Override
    public List<Map<Object, Object>> exportUser() {
        return userDao.exportUser();
    }


}
