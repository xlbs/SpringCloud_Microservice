package com.xlbs.apiservice.dao.imp;

import com.xlbs.apiservice.dao.intf.I_JobDao;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JobDao implements I_JobDao {

    @Autowired
    private SqlSession sqlSession;


}
