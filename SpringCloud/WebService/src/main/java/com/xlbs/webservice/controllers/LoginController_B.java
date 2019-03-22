package com.xlbs.webservice.controllers;

import com.google.common.collect.ImmutableMap;
import com.xlbs.webservice.authentication.user.User;
import com.xlbs.webservice.authentication.user.UserInfo;
import com.xlbs.webservice.authentication.user.UserResponse;
import com.xlbs.webservice.feign.UserFeignClient;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.xlbs.constantjar.SessionConstant;

import javax.servlet.http.HttpSession;
import java.util.Objects;

@RestController
public class LoginController_B {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserFeignClient userFeignClient;

    @RequestMapping(value = "/loginB",method={ RequestMethod.GET, RequestMethod.POST})
    public HttpEntity login(@ModelAttribute User user, HttpSession session) {
        UserInfo userInfo = null;
        try {
            userInfo = userFeignClient.findUserByUsername(user.getUsername());
            if(Objects.isNull(userInfo)){
                return ResponseEntity.ok().body(ImmutableMap.of( "status","error","message","用户不存在"));
            }
            Authentication token = new UsernamePasswordAuthenticationToken(user.getUsername(), DigestUtils.sha1Hex(user.getPassword()));//第一步，使用name和password封装成为的token
            Authentication result = authenticationManager.authenticate(token); //将token传递给Authentication进行验证
            SecurityContextHolder.getContext().setAuthentication(result);
        }catch (Exception e){
            if(e instanceof BadCredentialsException){
                e.printStackTrace();
                return ResponseEntity.ok().body(ImmutableMap.of( "status","error","message","用户名或密码错误"));
            }else{
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(ImmutableMap.of( "message","服务器异常,请稍后重试"));
            }
        }

        session.setAttribute(SessionConstant.USER_ID, userInfo.getUserId());
        session.setAttribute(SessionConstant.USERNAME, userInfo.getUsername());
        session.setAttribute(SessionConstant.NAME, userInfo.getName());
        session.setAttribute(SessionConstant.USER_TYPE, userInfo.getType());

        UserResponse userResponse = new UserResponse(userInfo.getUserId(),userInfo.getUsername(),userInfo.getName(),userInfo.getType());
        return ResponseEntity.ok().body(ImmutableMap.of("status","success","data",userResponse,"message","登入成功"));
    }




}
