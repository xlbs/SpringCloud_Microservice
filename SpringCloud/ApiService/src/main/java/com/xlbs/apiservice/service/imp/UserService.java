package com.xlbs.apiservice.service.imp;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.commutils.utils.RandomCodeUtils;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class UserService implements I_UserService {

    @Autowired
    private I_UserDao userDao;

    @Autowired
    private I_RoleDao roleDao;


    @Override
    public PageInfo<Map<Object, Object>> findUserList(UserQuery userQuery) {
        return userDao.findUserList(userQuery);
    }

    @Override
    public User findUserInfoByUserId(Long userId) {
        User user = userDao.findUserInfoByUserId(userId);
        user.setPassword(DigestUtils.sha1Hex(user.getPassword()));
        List<Role> roles = roleDao.findRolesByUserId(userId);
        user.setRoles(roles);
        return user;
    }

    @Override
    @Transactional
    public void saveUserInfo(User user) {
        Long id = RandomCodeUtils.getRandomId();
        user.setUserId(id);
        String password = DigestUtils.sha1Hex(user.getPassword());
        user.setPassword(password);
        List<Role> roles = user.getRoles();
        for (Role role : roles){
            role.setUserId(id);
        }
        userDao.saveUser(user);
        roleDao.saveUserRoles(roles);
    }

    @Override
    public List<Map<Object, Object>> exportUser() {
        return userDao.exportUser();
    }


}
