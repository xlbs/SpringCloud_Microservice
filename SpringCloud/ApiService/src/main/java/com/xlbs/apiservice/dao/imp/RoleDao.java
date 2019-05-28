package com.xlbs.apiservice.dao.imp;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.NameSpace;
import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;
import com.xlbs.constantjar.RequestContextUtils;
import com.xlbs.constantjar.SysConstant;
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
    public PageInfo<Role> find(RoleQuery query) {
        if(!RequestContextUtils.getUserType().equals(SysConstant.SUPER_USER)){
            query.setCreatedBy(RequestContextUtils.getUserId());
        }
        return PageHelper.startPage(query.getCurrentPage(),query.getPageSize())
                .doSelectPageInfo(()->sqlSession.selectList(NameSpace.ROLE_NAMESPACE+".find",query));
    }

    @Override
    public Role findById(Long id) {
        return sqlSession.selectOne(NameSpace.ROLE_NAMESPACE+".select", ImmutableMap.of("id",id));
    }

    @Override
    public void save(Role obj) {
        obj.setCreatedBy(RequestContextUtils.getUserId());
        obj.setCreatedDate(new Date());
        sqlSession.insert(NameSpace.ROLE_NAMESPACE+".save", obj);
    }

    @Override
    public void update(Role obj) {
        obj.setLastModifyBy(RequestContextUtils.getUserId());
        obj.setLastModifyDate(new Date());
        sqlSession.update(NameSpace.ROLE_NAMESPACE+".update", obj);
    }

    @Override
    public void delete(Long id) {
        sqlSession.delete(NameSpace.ROLE_NAMESPACE+".delete",ImmutableMap.of("id",id));
    }


    @Override
    public List<Role> findAll() {
        if(!RequestContextUtils.getUserType().equals(SysConstant.SUPER_USER)){
            return sqlSession.selectList(NameSpace.ROLE_NAMESPACE+".select", ImmutableMap.of("createdBy",RequestContextUtils.getUserId()));
        }else{
            return sqlSession.selectList(NameSpace.ROLE_NAMESPACE+".select");
        }
    }

}
