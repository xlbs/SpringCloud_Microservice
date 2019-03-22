package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.service.intf.I_MenuService;
import com.xlbs.apiservice.service.intf.I_UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private I_UserService userService;

    @Autowired
    private I_MenuService menuService;

    /**
     * 用户通过用户名和密码登入
     * @param username 用户名
     * @return
     */
    @ApiOperation(value="用户登入")
    @RequestMapping(value = "/login", method={RequestMethod.GET})
    public User login(@RequestParam String username){
        return userService.findUserByUsername(username);
    }

    /**
     * 查找用户所拥有的菜单
     * @param userId 用户ID
     * @return
     */
    @ApiOperation(value="用户菜单")
    @GetMapping(value = "/menu/{userId}")
    public List<Menu> login(@PathVariable Long userId){
        return menuService.findMenuByUserId(userId);
    }






    /**
     * 查询所有用户信息
     * @return
     */
    @ApiOperation(value="获取用户列表", notes="")
    @RequestMapping(value = "/findAllUser", method={RequestMethod.GET, RequestMethod.POST})
    public List<User> findAllUser(){
        return userService.findAllUser();
    }

    /**
     * 通过userId查询用户信息
     * @param userId 用户Id
     * @return
     */
    @ApiOperation(value="获取用户详细信息", notes="根据userId来获取用户详细信息")
//    @ApiImplicitParam(name = "userId", value = "用户ID", required = true, dataType = "Integer")
    @RequestMapping(value = "/findUserByUserId", method={RequestMethod.GET, RequestMethod.POST})
    public User findUserByUserId(@RequestParam Long userId){
        return userService.findUserByUserId(userId);
    }

    /**
     * 通过username查询用户信息
     * @param username 用户名
     * @return
     */
    @ApiOperation(value="获取用户详细信息", notes="根据userName来获取用户详细信息")
    @RequestMapping(value = "/findUserByUsername", method={RequestMethod.GET, RequestMethod.POST})
    public User findUserByUsername(@RequestParam String username){
        return userService.findUserByUsername(username);
    }

    /**
     * 通过name查询用户信息
     * @param name 姓名
     * @return
     */
    @ApiOperation(value="获取用户详细信息", notes="根据name来获取用户详细信息")
    @RequestMapping(value = "/findUserByName", method={RequestMethod.GET, RequestMethod.POST})
    public User findUserByName(@RequestParam String name){
        return userService.findUserByName(name);
    }


}