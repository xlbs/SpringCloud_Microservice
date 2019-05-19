package com.xlbs.apiservice.service.imp;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.commutils.utils.RandomCodeUtils;
import com.xlbs.constantjar.RequestContextUtils;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class UserService implements I_UserService {

    @Autowired
    private I_UserDao userDao;

    @Autowired
    private I_RoleDao roleDao;


    @Override
    public PageInfo<User> findUserList(UserQuery userQuery) {
        return userDao.findUserList(userQuery);
    }

    @Override
    public User findUserInfoById(Long id) {
        User user = userDao.findUserInfoById(id);
        List<Role> roles = roleDao.findRolesByUserId(id);
        user.setRoles(roles);
        return user;
    }

    @Override
    @Transactional
    public void saveUserInfo(User user, Boolean isEdit) {
        Long id  = null;
        if(!Objects.isNull(isEdit) && isEdit){
            id = user.getId();
            roleDao.deleteUserRoles(id);
            userDao.updateUser(user);
        }else{
            id = RandomCodeUtils.getRandomId();
            user.setId(id);
            String password = DigestUtils.sha1Hex(user.getPassword());
            user.setPassword(password);
            userDao.saveUser(user);
        }
        List<Role> roles = user.getRoles();
        for (Role role : roles){
            role.setUserId(id);
            role.setCreatedBy(RequestContextUtils.getUserId());
            role.setCreatedDate(new Date());
        }
        roleDao.saveUserRoles(roles);
    }

    @Override
    @Transactional
    public void deleteUserInfo(Long userId) {
        roleDao.deleteUserRoles(userId);
        userDao.deleteUser(userId);
    }

    @Override
    public List<Map<Object, Object>> exportUser() {
        return userDao.exportUser();
    }


}
