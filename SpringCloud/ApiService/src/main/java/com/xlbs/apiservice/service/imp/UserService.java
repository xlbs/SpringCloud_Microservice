package com.xlbs.apiservice.service.imp;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.dao.intf.I_UserRoleDao;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.UserRole;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.query.UserQuery;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.commutils.utils.RandomCodeUtils;
import com.xlbs.constantjar.RequestContextUtils;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserService implements I_UserService {

    @Autowired
    private I_UserDao userDao;

    @Autowired
    private I_UserRoleDao userRoleDao;


    @Override
    public PageInfo<User> findUserList(UserQuery userQuery) {
        return userDao.findUserList(userQuery);
    }

    @Override
    public User findUserInfoById(Long id) {
        User user = userDao.findUserInfoById(id);
        List<Role> userRoles = userRoleDao.findRolesByUserId(id);
        user.setRoles(userRoles);
        return user;
    }

    @Override
    @Transactional
    public void saveUserInfo(User user, Boolean isEdit) {
        Long id  = null;
        if(!Objects.isNull(isEdit) && isEdit){
            id = user.getId();
            userRoleDao.deleteUserRolesByUserId(id);
            userDao.updateUser(user);
        }else{
            id = RandomCodeUtils.getRandomId();
            user.setId(id);
            String password = DigestUtils.sha1Hex(user.getPassword());
            user.setPassword(password);
            userDao.saveUser(user);
        }
        List<Role> roles = user.getRoles();
        List<UserRole> userRoleList = new ArrayList<>();
        for (Role role : roles){
            UserRole userRole = new UserRole();
            userRole.setUserId(id);
            userRole.setRoleId(role.getId());
            userRole.setCreatedBy(RequestContextUtils.getUserId());
            userRole.setCreatedDate(new Date());
            userRoleList.add(userRole);
        }
        userRoleDao.saveUserRoles(userRoleList);
    }

    @Override
    @Transactional
    public void deleteUserInfo(Long id) {
        userRoleDao.deleteUserRolesByUserId(id);
        userDao.deleteUserById(id);
    }

    @Override
    public List<Map<Object, Object>> exportUser() {
        return userDao.exportUser();
    }


}
