package com.xlbs.apiservice.service.imp;

import com.xlbs.apiservice.dao.intf.I_DataDictDao;
import com.xlbs.apiservice.entity.CodeValue;
import com.xlbs.apiservice.entity.DataDict;
import com.xlbs.apiservice.entity.DataDictInfo;
import com.xlbs.apiservice.service.intf.I_DataDictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class DataDictService implements I_DataDictService {

    @Autowired
    private I_DataDictDao dataDictDao;

    @Override
    public DataDictInfo findDataDict(String category) {
        DataDictInfo dataDictInfo = new DataDictInfo();
        List<CodeValue> list = new ArrayList<>();
        List<DataDict> dataDictList = dataDictDao.findDataDict(category);
        for (DataDict dataDict : dataDictList){
            if(!dataDict.getCategory().equals(dataDictInfo.getCategory())){
                dataDictInfo.setCategory(dataDict.getCategory());
            }
            CodeValue codeValue = new CodeValue();
            codeValue.setCode(dataDict.getCode());
            codeValue.setValue(dataDict.getValue());
            codeValue.setIndex(dataDict.getIndex());
            list.add(codeValue);
        }
        dataDictInfo.setList(list);
        return dataDictInfo;
    }

    @Override
    public List<DataDictInfo> findDataDict(List<String> categoryList) {
        List<DataDictInfo> dataDictInfoList = new ArrayList<>();
        List<DataDict> dataDictList = dataDictDao.findDataDict(categoryList);
        Set<String> categorySet = new HashSet<>();//用于去重
        for (DataDict dataDict : dataDictList){
            if(!categorySet.contains(dataDict.getCategory())){
                categorySet.add(dataDict.getCategory());
                DataDictInfo dataDictInfo = new DataDictInfo();
                dataDictInfo.setCategory(dataDict.getCategory());
                dataDictInfoList.add(dataDictInfo);
            }
        }
        for (DataDictInfo dataDictInfo : dataDictInfoList){
            List<CodeValue> list = new ArrayList<>();
            for (DataDict dataDict : dataDictList){
                if(dataDictInfo.getCategory().equals(dataDict.getCategory())){
                    CodeValue codeValue = new CodeValue();
                    codeValue.setCode(dataDict.getCode());
                    codeValue.setValue(dataDict.getValue());
                    codeValue.setIndex(dataDict.getIndex());
                    list.add(codeValue);
                }
            }
            dataDictInfo.setList(list);
        }
        return dataDictInfoList;
    }


}
