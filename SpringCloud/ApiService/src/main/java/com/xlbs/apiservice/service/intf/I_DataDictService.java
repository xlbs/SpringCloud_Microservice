package com.xlbs.apiservice.service.intf;

import com.xlbs.apiservice.entity.DataDictInfo;

import java.util.List;

public interface I_DataDictService {

    public DataDictInfo findDataDict(String category);

    public List<DataDictInfo> findDataDict(List<String> categoryList);


}
