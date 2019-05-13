package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.entity.DataDictInfo;
import com.xlbs.apiservice.service.intf.I_DataDictService;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/dataDict")
public class DataDictController extends ResponseResult {

    @Autowired
    private I_DataDictService dataDictService;

    /**
     * 根据类别查找字典表数据
     * @param category 类别
     * @return
     */
    @ApiOperation(value="根据类别查找字典表数据")
    @GetMapping(value = "/{category}")
    public ResponseResult find(@PathVariable String category){
        DataDictInfo dataDictDao = dataDictService.findDataDict(category);
        if(!Objects.isNull(dataDictDao)){
            return super.success(dataDictDao);
        }
        return super.success();
    }

    /**
     * 根据类别列表查找字典表数据
     * @param categoryList 类别列表
     * @return
     */
    @ApiOperation(value="根据类别列表查找字典表数据")
    @GetMapping(value = "/find")
    public ResponseResult find(@RequestParam(value = "category") List<String> categoryList){
        List<DataDictInfo> list = dataDictService.findDataDict(categoryList);
        if(!list.isEmpty()){
            return super.success(list);
        }
        return super.success();
    }


}
