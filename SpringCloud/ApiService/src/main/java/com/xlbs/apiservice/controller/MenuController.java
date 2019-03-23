package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.service.intf.I_MenuService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/menu")
public class MenuController {

    @Autowired
    private I_MenuService menuService;

    /**
     * 根据用户ID查找该用户所拥有的菜单
     * @param userId 用户ID
     * @return
     */
    @ApiOperation(value="根据用户ID查找该用户所拥有的菜单")
    @GetMapping(value = "/{userId}")
    public List<Menu> findMenu(@PathVariable Long userId){
        return menuService.findMenuByUserId(userId);
    }




}