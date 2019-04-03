package com.xlbs.apiservice.controller;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.UserQuery;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.constantjar.RepStateCode;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping(value = "/user")
public class UserController extends ResponseResult {

    @Autowired
    private I_UserService userService;

    /**
     * 用户登入
     * @param username 用户名
     * @return
     */
    @ApiOperation(value="用户登入", notes="哒哒哒哒哒哒")
    @RequestMapping(value = "/login", method={RequestMethod.GET})
    public ResponseResult login(@RequestParam String username){
        User user = userService.findUserByUsername(username);
        if(!Objects.isNull(user)){
            return success(user);
        }
        return custom(RepStateCode.USER_NOT_EXIST);
    }

    /**
     * 查找系统中的用户数据
     * @return
     */
    @ApiOperation(value="查找系统中的用户数据")
    @PostMapping(value = "/findUserList")
    public ResponseResult findUserList(@RequestBody UserQuery userQuery){
        PageInfo<Map<Object,Object>> pageInfo = userService.findUserList(userQuery);
        return success(pageInfo.getList());
    }

    /**
     * 保存用户
     * @return
     */
    @ApiOperation(value="保存用户")
    @PostMapping(value = "/saveUser")
    public ResponseResult saveUser(@RequestBody User user){
        userService.saveUser(user);
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