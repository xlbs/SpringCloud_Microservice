package com.xlbs.apiservice.dao.imp;

import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserInfo;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserDao implements I_UserDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<User> findAllUser() {
        return sqlSession.selectList("findAllUser");
    }

    @Override
    public User findUserByUserId(Long userId) {
        return sqlSession.selectOne("findUserByUserId", userId);
    }

    @Override
    public User findUserByUsername(String username) {
        return sqlSession.selectOne("findUserByUsername", ImmutableMap.of("username",username));
    }

    @Override
    public User findUserByName(String name) {
        return sqlSession.selectOne("findUserByName", ImmutableMap.of("name",name));
    }

    @Override
    public List<UserInfo> findUserList() {
        return sqlSession.selectList("findUserList");
    }

    @Override
    public List<Map<Object, Object>> exportUser() {
        return sqlSession.selectList("exportUser");
    }


}
