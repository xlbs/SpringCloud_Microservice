package com.xlbs.dataoperatservice.service.comm.imp;

import com.xlbs.commutils.exceptions.JSONException;
import com.xlbs.commutils.obj.SaveEntity;
import com.xlbs.commutils.utils.JSONUtils;
import com.xlbs.dataoperatservice.dao.intf.I_CommDao;
import com.xlbs.dataoperatservice.service.comm.intf.I_CommService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class CommService implements I_CommService {

    @Autowired
    private I_CommDao commDao;

    /**
     * 查询
     * @param sql SQL语句
     * @return
     */
    @Override
    public List<Map> querySql(String sql){
        return commDao.querySql(sql);
    }

    /**
     * 保存
     * @param sql SQL语句
     * @return
     */
    @Override
    public Long[] saveSql(String sql){
        SaveEntity saveObj = new SaveEntity(sql);
        Integer affectCount = commDao.saveSql(saveObj);
        Long[] result = new Long[affectCount];
        for(int i=0; i<affectCount;i++){
            result[i] = saveObj.getId()+i;
        }
        return result;
    }

    /**
     * 修改
     * @param sql SQL语句
     * @return
     */
    @Override
    public boolean updateSql(String sql){
        Integer  affectCount = commDao.updateSql(sql);
        if(affectCount<=0){
            return false;
        }
        return true;
    }

    /**
     * 删除
     * @param sql SQL语句
     * @return
     */
    @Override
    public boolean deleteSql(String sql){
        Integer  affectCount = commDao.deleteSql(sql);
        if(affectCount<=0){
            return false;
        }
        return true;
    }

    /**
     * 批量保存
     * @param tabName 表名
     * @param fieldName 字段名 JSON字符串(Map<String,Object>)
     * @param datelist 数据列表 JSON字符串(List<Map<String,Object>>)
     * @return
     */
    @Override
    public Long[] batchSaveSql(String tabName, String fieldName, String datelist){
        try {
            StringBuffer sb = new StringBuffer();
            Map<String,Object> field = JSONUtils.deserialize(fieldName, new JSONUtils.ObjectToken<Map<String,Object>>(){});
            List<Map<String,Object>> list = JSONUtils.deserialize(datelist, new JSONUtils.ObjectToken<List<Map<String,Object>> >(){});
            String sql = "";
            for (String str : field.keySet()){
                sql += str + ",";
            }
            sql = sql.substring(0,sql.length()-1);
            if(sql!=""){
                sb.append(" INSERT INTO "+tabName +" ("+sql+") VALUES ");
            }
            for (Map<String,Object> map : list){
                sql = "";
                for (String str : field.keySet()){
                    if(field.get(str) instanceof String){
                        sql += "'"+map.get(str)+"'" + ",";
                    }else if(field.get(str) instanceof  Integer){
                        sql += Integer.valueOf(map.get(str)+"") + ",";
                    }else if(field.get(str) instanceof  Long){
                        sql += Long.valueOf(map.get(str)+"") + ",";
                    }else if(field.get(str) instanceof  Double){
                        sql += Double.valueOf(map.get(str)+"") + ",";
                    }else{
                        sql += "'"+map.get(str)+"'" + ",";
                    }
                }
                sql = sql.substring(0,sql.length()-1);
                sb.append(" ("+sql+"),");
            }
            String sbSql = sb.toString();
            sbSql = sbSql.substring(0,sbSql.length()-1);
            System.out.println(sbSql);
            SaveEntity saveObj = new SaveEntity(sbSql);
            Integer affectCount = commDao.saveSql(saveObj);
            Long[] result = new Long[affectCount];
            for(int i=0; i<affectCount;i++){
                result[i] = saveObj.getId()+i;
            }
            return result;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 事务控制
     * @param sqlList sql语句集合 JSON字符串(List<String>)
     * @return
     */
    @Override
    @Transactional
    public boolean executeTrans(String sqlList){
        try {
            List<String> list = JSONUtils.deserialize(sqlList, new JSONUtils.ObjectToken<List<String>>(){});
            for (String sql : list){
                sql = sql.trim();//去掉首尾的空格
                String head = sql.substring(0,6);
                if("SELECT".equals(head)||"select".equals(head)){
                    commDao.querySql(sql);
                }else if("UPDATE".equals(head)||"update".equals(head)){
                    commDao.updateSql(sql);
                }else if("INSERT".equals(head)||"insert".equals(head)){
                    SaveEntity saveObj = new SaveEntity(sql);
                    commDao.saveSql(saveObj);
                }else if("DELETE".equals(head)||"delete".equals(head)){
                    commDao.deleteSql(sql);
                }
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }











}
