package com.xlbs.blogservice.dao.home;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class HomeDao implements I_HomeDao {

    @Autowired
    private SqlSession sqlSession;


}
