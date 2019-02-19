package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.commutils.obj.User;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/sysUser")
public class UserController {

    @Autowired
    private I_UserService userService;

    /**
     * 查询所有用户信息
     * @return
     */
    @ApiOperation(value="获取用户列表", notes="")
    @RequestMapping(value = "/findAllUser", method={RequestMethod.GET, RequestMethod.POST})
    public List<Map<Object,Object>> findAllUser(){
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
    public User findUserByUserId(@RequestParam Integer userId){
        return userService.findUserByUserId(userId);
    }

    /**
     * 通过userNo查询用户信息
     * @param userNo 用户编号
     * @return
     */
    @ApiOperation(value="获取用户详细信息", notes="根据userNo来获取用户详细信息")
    @RequestMapping(value = "/findUserByUserNo", method={RequestMethod.GET, RequestMethod.POST})
    public User findUserByUserNo(@RequestParam String userNo){
        return userService.findUserByUserNo(userNo);
    }

    /**
     * 通过userName查询用户信息
     * @param userName 用户名
     * @return
     */
    @ApiOperation(value="获取用户详细信息", notes="根据userName来获取用户详细信息")
    @RequestMapping(value = "/findUserByUserName", method={RequestMethod.GET, RequestMethod.POST})
    public User findUserByUserName(@RequestParam String userName){
        return userService.findUserByUserName(userName);
    }


}