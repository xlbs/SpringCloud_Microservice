package com.xlbs.apiservice.controller;

import com.xlbs.constantjar.CacheConstant;
import com.xlbs.constantjar.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/system")
public class SystemController extends ResponseResult {

    @Autowired
    private CacheManager cacheManager;

    @DeleteMapping(value = "/clearCache")
    public ResponseResult clearCache(){
        cacheManager.getCache(CacheConstant.DATA_DICT).clear();
        return success();
    }



}
