package com.xlbs.apiservice.dao.imp;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.NameSpace;
import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;
import com.xlbs.constantjar.RequestContextUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class RoleDao implements I_RoleDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public PageInfo<Role> find(RoleQuery roleQuery) {
        return PageHelper.startPage(roleQuery.getCurrentPage(),roleQuery.getPageSize())
                .doSelectPageInfo(()->sqlSession.selectList(NameSpace.ROLE_NAMESPACE+".find",roleQuery));
    }

    @Override
    public Role findById(Long id) {
        return sqlSession.selectOne(NameSpace.ROLE_NAMESPACE+".select", ImmutableMap.of("id",id));
    }

    @Override
    public void save(Role role) {
        role.setCreatedBy(RequestContextUtils.getUserId());
        role.setCreatedDate(new Date());
        sqlSession.insert(NameSpace.ROLE_NAMESPACE+".save", role);
    }

    @Override
    public void update(Role role) {
        role.setLastModifyBy(RequestContextUtils.getUserId());
        role.setLastModifyDate(new Date());
        sqlSession.update(NameSpace.ROLE_NAMESPACE+".update", role);
    }

    @Override
    public void delete(Long id) {
        sqlSession.delete(NameSpace.ROLE_NAMESPACE+".delete",ImmutableMap.of("id",id));
    }


    @Override
    public List<Role> findRoles() {
        return sqlSession.selectList(NameSpace.ROLE_NAMESPACE+".select");
    }

}
