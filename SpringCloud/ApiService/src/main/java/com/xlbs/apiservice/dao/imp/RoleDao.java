package com.xlbs.apiservice.dao.imp;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleDao implements I_RoleDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public PageInfo<Role> findList(RoleQuery roleQuery) {
        return PageHelper.startPage(roleQuery.getCurrentPage(),roleQuery.getPageSize())
                .doSelectPageInfo(()->sqlSession.selectList("findList",roleQuery));
    }

    @Override
    public Role findRoleById(Long id) {
        return sqlSession.selectOne("findRole", ImmutableMap.of("id",id));
    }

    @Override
    public List<Role> findRoles() {
        return sqlSession.selectList("findRole");
    }

}
