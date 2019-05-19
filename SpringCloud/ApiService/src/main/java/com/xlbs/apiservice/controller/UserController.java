package com.xlbs.apiservice.controller;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/user")
public class UserController extends ResponseResult {

    @Autowired
    private I_UserService userService;

    /**
     * 查找系统中的用户数据
     * @return
     */
    @ApiOperation(value="查找系统中的用户数据")
    @PostMapping(value = "/findUserList")
    public ResponseResult findUserList(@RequestBody UserQuery userQuery){
        PageInfo<User> pageInfo = userService.findUserList(userQuery);
        return success(pageInfo);
    }

    /**
     * 查找某个用户信息
     * @return
     */
    @ApiOperation(value="查找某个用户的角色数据")
    @GetMapping(value = "/{id}")
    public ResponseResult findUserInfoById(@PathVariable(value = "id") Long id){
        User user = userService.findUserInfoById(id);
        return success(user);
    }

    /**
     * 保存用户信息
     * @return
     */
    @ApiOperation(value="保存用户信息")
    @PostMapping(value = "/saveUserInfo")
    public ResponseResult saveUserInfo(@RequestBody User user, @RequestParam(required = false) Boolean isEdit){
        userService.saveUserInfo(user,isEdit);
        return success();
    }

    /**
     * 删除用户信息
     * @return
     */
    @ApiOperation(value="删除用户信息")
    @GetMapping(value = "delete/{userId}")
    public ResponseResult deleteUserInfo(@PathVariable(value = "userId") Long userId){
        userService.deleteUserInfo(userId);
        return success();
    }

    /**
     * 导出系统中的用户数据
     * @return
     */
    @ApiOperation(value="导出系统中的用户数据")
    @GetMapping(value = "/export")
    public ResponseResult exportUser(){
        List<Map<Object,Object>> list = userService.exportUser();
        if(!list.isEmpty()){
            return success(list);
        }
        return success();
    }



}