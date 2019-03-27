package com.xlbs.zuulservice.controllers;

import com.xlbs.constantjar.RepStateCode;
import com.xlbs.constantjar.ResponseResult;
import com.xlbs.zuulservice.user.User;
import com.xlbs.zuulservice.user.UserInfo;
import com.xlbs.zuulservice.user.UserResponse;
import com.xlbs.zuulservice.feign.UserFeignClient;
import net.sf.json.JSONObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.xlbs.constantjar.SessionConstant;

import javax.servlet.http.HttpSession;

@RestController
public class LoginController extends ResponseResult {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserFeignClient userFeignClient;

    @RequestMapping(value = "/loginB",method={ RequestMethod.GET, RequestMethod.POST})
    public ResponseResult login(@RequestBody User user, HttpSession session) {
        UserInfo userInfo = null;
        try {
            ResponseResult result = userFeignClient.findUserByUsername(user.getUsername());
            if(result.getState()){
                JSONObject json = JSONObject.fromObject(result.getData());
                userInfo = (UserInfo)JSONObject.toBean(json, UserInfo.class);
            }else{
                return result;
            }
            Authentication token = new UsernamePasswordAuthenticationToken(user.getUsername(), DigestUtils.sha1Hex(user.getPassword()));//第一步，使用name和password封装成为的token
            Authentication authentication = authenticationManager.authenticate(token); //将token传递给Authentication进行验证
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }catch (Exception e){
            if(e instanceof BadCredentialsException){
                return custom(RepStateCode.USER_LOGIN_ERROR);
            }else{
                e.printStackTrace();
                return failure();
            }
        }

        session.setAttribute(SessionConstant.USER_ID, userInfo.getUserId());
        session.setAttribute(SessionConstant.USERNAME, userInfo.getUsername());
        session.setAttribute(SessionConstant.NAME, userInfo.getName());
        session.setAttribute(SessionConstant.USER_TYPE, userInfo.getType());

        UserResponse userResponse = new UserResponse(userInfo.getUserId(),userInfo.getUsername(),userInfo.getName(),userInfo.getType());
        return super.success(userResponse);
    }


}
