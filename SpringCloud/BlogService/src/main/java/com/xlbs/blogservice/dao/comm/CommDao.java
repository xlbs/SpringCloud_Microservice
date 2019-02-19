package com.xlbs.blogservice.dao.comm;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class CommDao implements I_CommDao {

    @Autowired
    private SqlSession sqlSession;



}
