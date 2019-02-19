package com.xlbs.dataoperatservice.service.comm.intf;

import java.util.List;
import java.util.Map;

public interface I_CommService {

    /**
     * 查询
     * @param sql SQL语句
     * @return
     */
    public List<Map> querySql(String sql);

    /**
     * 保存
     * @param sql SQL语句
     * @return
     */
    public Long[] saveSql(String sql);

    /**
     * 修改
     * @param sql SQL语句
     * @return
     */
    public boolean updateSql(String sql);

    /**
     * 删除
     * @param sql SQL语句
     * @return
     */
    public boolean deleteSql(String sql);

    /**
     * 批量保存
     * @param tabName 表名
     * @param fieldName 字段名 JSON字符串(Map<String,Object>)
     * @param datelist 数据列表 JSON字符串(List<Map<String,Object>>)
     * @return
     */
    public Long[] batchSaveSql(String tabName, String fieldName, String datelist);

    /**
     * 事务控制
     * @param sqlList sql语句集合 JSON字符串(List<String>)
     * @return
     */
    public boolean executeTrans(String sqlList);



}
