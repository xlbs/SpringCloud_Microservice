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
     * 用户登入
     * @param username 用户名
     * @return
     */
    @ApiOperation(value="用户登入")
    @RequestMapping(value = "/login", method={RequestMethod.GET})
    public User login(@RequestParam String username){
        return userService.findUserByUsername(username);
    }

    /**
     * 根据用户ID查找该用户所拥有的菜单
     * @param userId 用户ID
     * @return
     */
    @ApiOperation(value="根据用户ID查找该用户所拥有的菜单")
    @GetMapping(value = "/menu/{userId}")
    public List<Menu> findMenu(@PathVariable Long userId){
        return menuService.findMenuByUserId(userId);
    }

    /**
     * 查找系统中的用户列表
     * @return
     */
    @ApiOperation(value="查找系统中的用户列表", notes="哒哒哒哒哒哒")
    @GetMapping(value = "/findUserList")
    public List<User> findUserList(){
        return userService.findAllUser();
    }



}