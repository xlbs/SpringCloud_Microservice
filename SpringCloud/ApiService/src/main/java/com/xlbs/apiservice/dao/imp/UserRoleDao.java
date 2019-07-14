package com.xlbs.apiservice.dao.imp;

import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_UserRoleDao;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.UserRole;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRoleDao implements I_UserRoleDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<Role> findRolesByUserId(Long userId) {
        return sqlSession.selectList("findUserRole",ImmutableMap.of("userId",userId));
    }

    @Override
    public List<Role> findRolesByRoleId(Long roleId) {
        return sqlSession.selectList("findUserRole",ImmutableMap.of("roleId",roleId));
    }

    @Override
    public void saveUserRoles(List<UserRole> userRoles) {
        sqlSession.insert("saveUserRoles", userRoles);
    }

    @Override
    public void deleteUserRolesByUserId(Long userId) {
        sqlSession.delete("deleteUserRolesByUserId",userId);
    }


}
