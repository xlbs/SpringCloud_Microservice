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
        return sqlSession.selectList("findRole");
    }

}
