package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.entity.DataDictInfo;
import com.xlbs.apiservice.service.intf.I_DataDictService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/dataDict")
public class DataDictController {

    @Autowired
    private I_DataDictService dataDictService;

    /**
     * 根据类别查找字典表数据
     * @param category 类别
     * @return
     */
    @ApiOperation(value="根据类别查找字典表数据")
    @GetMapping(value = "/{category}")
    public DataDictInfo find(@PathVariable String category){
        return dataDictService.findDataDict(category);
    }

    /**
     * 根据类别列表查找字典表数据
     * @param categoryList 类别列表
     * @return
     */
    @ApiOperation(value="根据类别列表查找字典表数据")
    @GetMapping(value = "/find")
    public List<DataDictInfo> find(@RequestParam(value = "category") List<String> categoryList){
        return dataDictService.findDataDict(categoryList);
    }


}
