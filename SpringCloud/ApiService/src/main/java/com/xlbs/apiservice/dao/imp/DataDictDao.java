package com.xlbs.apiservice.dao.imp;

import com.xlbs.apiservice.dao.intf.I_DataDictDao;
import com.xlbs.apiservice.entity.DataDict;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DataDictDao implements I_DataDictDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<DataDict> findDataDict(String category) {
        return sqlSession.selectList("findDataDictByCategory",category);
    }

    @Override
    public List<DataDict> findDataDict(List<String> categoryList) {
        return sqlSession.selectList("findDataDictByCategoryList",categoryList);
    }


}
