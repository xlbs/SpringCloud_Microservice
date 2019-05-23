package com.xlbs.apiservice.controller;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;
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
     * 查找系统中的角色列表
     * @return
     */
    @ApiOperation(value="查找系统中的角色列表")
    @PostMapping(value = "/find")
    public ResponseResult findList(@RequestBody RoleQuery roleQuery){
        PageInfo<Role> pageInfo = roleService.findList(roleQuery);
        return success(pageInfo);
    }

    /**
     * 查找某个角色信息
     * @return
     */
    @ApiOperation(value="查找某个角色信息")
    @GetMapping(value = "/find/{id}")
    public ResponseResult findRoleById(@PathVariable(value = "id") Long id){
        Role role = roleService.findRoleById(id);
        return success(role);
    }

    /**
     * 保存角色信息
     * @return
     */
    @ApiOperation(value="保存角色信息")
    @PostMapping(value = "/save")
    public ResponseResult save(@RequestBody Role role, @RequestParam(required = false) Boolean isEdit){
        roleService.save(role,isEdit);
        return success();
    }

    /**
     * 删除角色信息
     * @return
     */
    @ApiOperation(value="删除角色信息")
    @GetMapping(value = "delete/{id}")
    public ResponseResult delete(@PathVariable(value = "id") Long id){
        roleService.delete(id);
        return success();
    }

    /**
     * 查找系统中的角色数据
     * @return
     */
    @ApiOperation(value="查找系统中的角色数据")
    @GetMapping(value = "/findRoles")
    public ResponseResult findRoles(){
        List<Role> list = roleService.findRoles();
        return success(list);
    }

}