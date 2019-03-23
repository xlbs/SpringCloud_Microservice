package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.DataDict;

import java.util.List;

public interface I_DataDictDao {

    public List<DataDict> findDataDict(String category);

    public List<DataDict> findDataDict(List<String> categoryList);


}
