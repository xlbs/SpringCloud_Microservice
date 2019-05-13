package com.xlbs.apiservice.dao.imp;

import com.xlbs.apiservice.dao.intf.I_DataDictDao;
import com.xlbs.apiservice.entity.DataDict;
import com.xlbs.constantjar.CacheConstant;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DataDictDao implements I_DataDictDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    @Cacheable(value = CacheConstant.DATA_DICT, key = "#category")
    public List<DataDict> findDataDict(String category) {
        return sqlSession.selectList("findDataDictByCategory",category);
    }

    @Override
    public List<DataDict> findDataDict(List<String> categoryList) {
        return sqlSession.selectList("findDataDictByCategoryList",categoryList);
    }


}
