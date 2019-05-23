package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.service.intf.I_MenuService;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/menu")
public class MenuController extends ResponseResult {

    @Autowired
    private I_MenuService menuService;

    /**
     * 查询所有的菜单
     * @return
     */
    @ApiOperation(value="查询所有的菜单")
    @GetMapping
    public ResponseResult findMenu(){
        List<Menu> list = menuService.findMenus();
        if(!list.isEmpty()){
            return super.success(list);
        }
        return super.success();
    }

    /**
     * 根据用户ID查找该用户所拥有的菜单
     * @param userId 用户id
     * @return
     */
    @ApiOperation(value="根据用户Id查找该用户所拥有的菜单")
    @GetMapping(value = "/{userId}")
    public ResponseResult findMenuByUserId(@PathVariable Long userId){
        List<Menu> list = menuService.findMenuByUserId(userId);
        if(!list.isEmpty()){
            return super.success(list);
        }
        return super.success();
    }




}