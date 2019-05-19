package com.xlbs.apiservice.dao.imp;

import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.entity.Role;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleDao implements I_RoleDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<Role> findRoles() {
        return sqlSession.selectList("findAllRole");
    }

    @Override
    public List<Role> findRolesByUserId(Long userId) {
        return sqlSession.selectList("findRolesByUserId",userId);
    }

    @Override
    public void saveUserRoles(List<Role> roles) {
        sqlSession.insert("saveUserRoles",roles);
    }

    @Override
    public void deleteUserRolesByUserId(Long userId) {
        sqlSession.delete("deleteUserRolesByUserId",userId);
    }


}
