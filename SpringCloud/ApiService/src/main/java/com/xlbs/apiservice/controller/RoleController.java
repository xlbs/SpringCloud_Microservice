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
     * 分页查找
     * @param roleQuery 条件
     * @return 分页结果对象
     */
    @ApiOperation(value="分页查找")
    @PostMapping(value = "/find")
    public ResponseResult find(@RequestBody RoleQuery roleQuery){
        PageInfo<Role> pageInfo = roleService.find(roleQuery);
        return success(pageInfo);
    }

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    @ApiOperation(value="查找某个角色信息")
    @GetMapping(value = "/find/{id}")
    public ResponseResult findById(@PathVariable(value = "id") Long id){
        Role role = roleService.findById(id);
        return success(role);
    }

    /**
     * 保存对象
     * @param role 对象
     * @param isEdit 是否编辑
     * @return 操作结果信息：成功/失败
     */
    @ApiOperation(value="保存角色信息")
    @PostMapping(value = "/save")
    public ResponseResult save(@RequestBody Role role, @RequestParam(required = false) Boolean isEdit){
        roleService.save(role,isEdit);
        return success();
    }

    /**
     * 删除对象
     * @param id 标识
     * @return
     */
    @ApiOperation(value="删除对象")
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