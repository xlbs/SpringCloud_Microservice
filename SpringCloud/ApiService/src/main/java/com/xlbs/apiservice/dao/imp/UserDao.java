package com.xlbs.apiservice.dao.imp;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;
import com.xlbs.constantjar.RequestContextUtils;
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
    public PageInfo<Map<Object, Object>> findUserList(UserQuery userQuery) {
        return PageHelper.startPage(userQuery.getCurrentPage(),userQuery.getPageSize())
                .doSelectPageInfo(()->sqlSession.selectList("findUserList",userQuery));
    }

    @Override
    public User findUserInfoByUserId(Long userId) {
        return sqlSession.selectOne("findUserInfoByUserId", ImmutableMap.of("userId",userId));
    }

    @Override
    public void saveUser(User user) {
        user.setCreatedBy(RequestContextUtils.getUserId());
        user.setCreatedDate(new Date());
        sqlSession.insert("saveUser", user);
    }

    @Override
    public void updateUser(User user) {
        user.setLastModifyBy(RequestContextUtils.getUserId());
        user.setLastModifyDate(new Date());
        sqlSession.update("updateUser", user);
    }

    @Override
    public void deleteUser(Long userId) {
        sqlSession.delete("deleteUser",userId);
    }

    @Override
    public List<Map<Object, Object>> exportUser() {
        return sqlSession.selectList("exportUser");
    }


}
