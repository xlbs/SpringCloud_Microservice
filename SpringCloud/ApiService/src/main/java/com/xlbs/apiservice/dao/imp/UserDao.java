package com.xlbs.apiservice.dao.imp;

import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_UserDao;
import com.xlbs.commutils.obj.User;
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
     * 通过userNo查询用户信息
     * @param userNo 用户编号
     * @return
     */
    @Override
    public User findUserByUserNo(String userNo) {
        return sqlSession.selectOne("findUserByUserNo", ImmutableMap.of("userNo",userNo));
    }

    /**
     * 通过userName查询用户信息
     * @param userName 用户名
     * @return
     */
    @Override
    public User findUserByUserName(String userName) {
        return sqlSession.selectOne("findUserByUserName", ImmutableMap.of("userName",userName));
    }


}
