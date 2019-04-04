package com.xlbs.apiservice.controller;

import com.xlbs.apiservice.entity.SignIn;
import com.xlbs.apiservice.service.intf.I_SignInService;
import com.xlbs.constantjar.RepStateCode;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping(value = "/signIn")
public class SignInController extends ResponseResult {

    @Autowired
    private I_SignInService signInService;

    /**
     * 用户登入
     * @param username 账号
     * @return
     */
    @ApiOperation(value="用户登入", notes="哒哒哒哒哒哒")
    @GetMapping
    public ResponseResult signIn(@RequestParam String username){
        SignIn signIn = signInService.signIn(username);
        if(!Objects.isNull(signIn)){
            return success(signIn);
        }
        return custom(RepStateCode.USER_NOT_EXIST);
    }



}