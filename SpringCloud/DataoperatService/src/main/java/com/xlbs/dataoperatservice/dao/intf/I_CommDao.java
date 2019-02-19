package com.xlbs.dataoperatservice.dao.intf;

import com.xlbs.commutils.obj.Page;
import com.xlbs.commutils.obj.SaveEntity;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface I_CommDao {


    /**
     * 查询
     * @param sql SQL语句
     * @return
     */
    public List<Map> querySql(String sql);

    /**
     * 保存
     * @param obj 对象
     * @return
     */
    public Integer saveSql(SaveEntity obj);

    /**
     * 修改
     * @param sql SQL语句
     * @return
     */
    public Integer updateSql(String sql);

    /**
     * 删除
     * @param sql SQL语句
     * @return
     */
    public Integer deleteSql(String sql);

    /**
     * 保存个实体
     * @param pojo
     * @return 影响的行数 0失败，1成功
     */
    public <T extends Serializable> int save(T pojo);

    /**
     * 通过id删除实体
     * @param clazz
     * @param id
     * @return
     */
    public <T extends Serializable> int deleteById(Class<T> clazz, Serializable id);

    /**
     * 通过主键获取实体
     * @param clazz
     * @param id
     * @return
     */
    public <T extends Serializable> T getById(Class<T> clazz, Serializable id);

    /**
     * 查询所有实体
     * @param clazz
     * @return
     */
    public <T extends Serializable> List<T> listAll(Class<T> clazz);

    /**
     * 分页查询
     * @param clazz
     * @param p
     * @return
     */
    public <T extends Serializable> Page<T> pageSelect(Class<T> clazz, Page<T> p, String[]attrs, Object[]values);


    /**
     * 分页查询时，用来统计总条数
     * @param clazz
     * @param attrs
     * @param values
     * @return
     */
    public <T extends Serializable> int pageCount(Class<T> clazz,String[]attrs,Object[]values);

    /**
     * 统计总条数
     * @param clazz
     * @return
     */
    public <T extends Serializable> int countAll(Class<T> clazz);

    /**
     * 指定查询使用的命名sql，查询结果封装成map
     * @param statment
     * @param paraMap
     * @return
     */
    public List<Map<String,Object>>  selectMap(String statment, Map<String, Object> paraMap);


}
