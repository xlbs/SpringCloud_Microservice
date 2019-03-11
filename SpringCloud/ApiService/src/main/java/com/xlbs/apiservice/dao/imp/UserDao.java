package com.xlbs.apiservice.dao.imp;

import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.constantjar.obj.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserDao implements I_UserDao {

    @Autowired
    private SqlSession sqlSession;

    /**
     * 查询所有用户信息
     * @return
     */
    @Override
    public List<Map<Object,Object>> findAllUser() {
        return sqlSession.selectList("findAllUser");
    }

    /**
     * 通过userId查询用户信息
     * @param userId 用户Id
     * @return
     */
    @Override
    public User findUserByUserId(Long userId) {
        return sqlSession.selectOne("findUserByUserId", userId);
    }

    /**
     * 通过username查询用户信息
     * @param username 用户编号
     * @return
     */
    @Override
    public User findUserByUsername(String username) {
        return sqlSession.selectOne("findUserByUsername", ImmutableMap.of("username",username));
    }

    /**
     * 通过name查询用户信息
     * @param name 用户名
     * @return
     */
    @Override
    public User findUserByName(String name) {
        return sqlSession.selectOne("findUserByName", ImmutableMap.of("name",name));
    }


}
