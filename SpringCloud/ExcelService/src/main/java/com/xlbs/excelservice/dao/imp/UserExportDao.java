package com.xlbs.excelservice.dao.imp;

import com.xlbs.excelservice.dao.intf.I_UserExportDao;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserExportDao implements I_UserExportDao {

    @Autowired
    private SqlSession sqlSession;

    /**
     * 查询所有用户信息
     * @return
     */
    @Override
    public List<Map<Object,Object>> findAllUser() {
        return sqlSession.selectList("findUserList");
    }



}
