package com.xlbs.apiservice.dao.imp;

import com.xlbs.apiservice.dao.intf.I_SignInDao;
import com.xlbs.apiservice.entity.SignIn;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SignInDao implements I_SignInDao {

    @Autowired
    private SqlSession sqlSession;


    @Override
    public SignIn signIn(String username) {
        return sqlSession.selectOne("signIn", username);
    }
}
