package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.service.intf.I_RoleService;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/role")
public class RoleController extends ResponseResult {

    @Autowired
    private I_RoleService roleService;

    /**
     * 查找系统中的角色数据
     * @return
     */
    @ApiOperation(value="查找系统中的角色数据")
    @GetMapping(value = "/findRoles")
    public ResponseResult findUserList(){
        List<Role> list = roleService.findRoles();
        return success(list);
    }



}