package com.xlbs.apiservice.dao.imp;

import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_RoleMenuDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.UserRole;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleMenuDao implements I_RoleMenuDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<Menu> findMenusByRoleId(Long roleId) {
        return sqlSession.selectList("findRoleMenu",ImmutableMap.of("roleId",roleId));
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
