package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.service.intf.I_MenuService;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public User login(@RequestParam String username){
        return userService.findUserByUsername(username);
    }

    /**
     * 查找系统中的用户数据
     * @return
     */
    @ApiOperation(value="查找系统中的用户数据")
    @GetMapping(value = "/findUserList")
    public ResponseResult findUserList(){
        List<User> list = userService.findAllUser();
        if(!list.isEmpty()){
            return super.success(list);
        }
        return super.success();
    }



}