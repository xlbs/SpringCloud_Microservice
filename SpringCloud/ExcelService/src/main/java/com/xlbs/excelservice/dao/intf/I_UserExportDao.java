package com.xlbs.excelservice.dao.intf;

import java.util.List;
import java.util.Map;

public interface I_UserExportDao {

    /**
     * 查询所有用户信息
     * @return
     */
    public List<Map<Object,Object>> findAllUser();


}
