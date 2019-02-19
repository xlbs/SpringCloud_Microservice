package com.xlbs.dataoperatservice.controller.user;

import com.xlbs.commutils.obj.User;
import com.xlbs.dataoperatservice.service.user.intf.I_UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private I_UserService userService;

    /**
     * 查询所有用户信息
     * @return
     */
    @RequestMapping(value = "/findAllUser", method={RequestMethod.GET, RequestMethod.POST})
    public List<Map> findAllUser(){
        return userService.findAllUser();
    }

    /**
     * 通过userId查询用户信息
     * @param userId 用户Id
     * @return
     */
    @RequestMapping(value = "/findUserByUserId", method={RequestMethod.GET, RequestMethod.POST})
    public User findUserByUserId(@RequestParam Integer userId){
        return userService.findUserByUserId(userId);
    }

    /**
     * 通过userNo查询用户信息
     * @param userNo 用户编号
     * @return
     */
    @RequestMapping(value = "/findUserByUserNo", method={RequestMethod.GET, RequestMethod.POST})
    public User findUserByUserNo(@RequestParam String userNo){
        return userService.findUserByUserNo(userNo);
    }

    /**
     * 通过userName查询用户信息
     * @param userName 用户名
     * @return
     */
    @RequestMapping(value = "/findUserByUserName", method={RequestMethod.GET, RequestMethod.POST})
    public User findUserByUserName(@RequestParam String userName){
        return userService.findUserByUserName(userName);
    }


}