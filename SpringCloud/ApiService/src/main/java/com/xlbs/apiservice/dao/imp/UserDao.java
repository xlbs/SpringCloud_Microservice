package com.xlbs.apiservice.dao.imp;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.NameSpace;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.query.UserQuery;
import com.xlbs.constantjar.RequestContextUtils;
import com.xlbs.constantjar.SysConstant;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public class UserDao implements I_UserDao {

    @Autowired
    private SqlSession sqlSession;


    @Override
    public PageInfo<User> find(UserQuery query) {
        if(!RequestContextUtils.getUserType().equals(SysConstant.SUPER_USER)){
            query.setCreatedBy(RequestContextUtils.getUserId());
        }
        return PageHelper.startPage(query.getCurrentPage(),query.getPageSize())
                .doSelectPageInfo(()->sqlSession.selectList(NameSpace.USER_NAMESPACE+".find",query));
    }

    @Override
    public User findById(Long id) {
        return sqlSession.selectOne(NameSpace.USER_NAMESPACE+".select", ImmutableMap.of("id",id));
    }

    @Override
    public void save(User obj) {
        obj.setCreatedBy(RequestContextUtils.getUserId());
        obj.setCreatedDate(new Date());
        sqlSession.insert(NameSpace.USER_NAMESPACE+".save", obj);
    }

    @Override
    public void update(User obj) {
        obj.setLastModifyBy(RequestContextUtils.getUserId());
        obj.setLastModifyDate(new Date());
        sqlSession.update(NameSpace.USER_NAMESPACE+".update", obj);
    }

    @Override
    public void delete(Long id) {
        sqlSession.delete(NameSpace.USER_NAMESPACE+".delete",ImmutableMap.of("id",id));
    }

    @Override
    public List<Map<Object, Object>> exportUser() {
        return sqlSession.selectList("exportUser");
    }


}
