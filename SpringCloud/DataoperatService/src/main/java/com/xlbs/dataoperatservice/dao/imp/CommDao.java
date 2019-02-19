package com.xlbs.dataoperatservice.dao.imp;

import com.google.common.collect.ImmutableMap;
import com.xlbs.commutils.obj.Page;
import com.xlbs.commutils.obj.SaveEntity;
import com.xlbs.dataoperatservice.dao.intf.I_CommDao;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public class CommDao implements I_CommDao {

    @Autowired
    private SqlSession sqlSession;

    /**
     * 查询
     * @param sql SQL语句
     * @return
     */
    @Override
    public List<Map> querySql(String sql) {
        return sqlSession.selectList("querySql",ImmutableMap.of("sql",sql));
    }

    /**
     * 保存
     * @param obj 对象
     * @return
     */
    @Override
    public Integer saveSql(SaveEntity obj) {
        return sqlSession.insert("saveSql",obj);
    }

    /**
     * 修改
     * @param sql SQL语句
     * @return
     */
    @Override
    public Integer updateSql(String sql) {
        return sqlSession.update("updateSql",ImmutableMap.of("sql",sql));
    }

    /**
     * 删除
     * @param sql SQL语句
     * @return
     */
    @Override
    public Integer deleteSql(String sql) {
        return sqlSession.delete("deleteSql",ImmutableMap.of("sql",sql));
    }

    @Override
    public <T extends Serializable> int save(T pojo) {
        return 0;
    }

    @Override
    public <T extends Serializable> int deleteById(Class<T> clazz, Serializable id) {
        return 0;
    }

    @Override
    public <T extends Serializable> T getById(Class<T> clazz, Serializable id) {
        return null;
    }

    @Override
    public <T extends Serializable> List<T> listAll(Class<T> clazz) {
        return null;
    }

    @Override
    public <T extends Serializable> Page<T> pageSelect(Class<T> clazz, Page<T> p, String[] attrs, Object[] values) {
        return null;
    }

    @Override
    public <T extends Serializable> int pageCount(Class<T> clazz, String[] attrs, Object[] values) {
        return 0;
    }

    @Override
    public <T extends Serializable> int countAll(Class<T> clazz) {
        return 0;
    }

    @Override
    public List<Map<String, Object>> selectMap(String statment, Map<String, Object> paraMap) {
        return null;
    }


}
