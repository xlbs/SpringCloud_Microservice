package com.xlbs.zuulservice.service;

import com.xlbs.constantjar.ResponseResult;
import com.xlbs.zuulservice.user.UserInfo;
import com.xlbs.zuulservice.feign.UserFeignClient;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserFeignClient userFeignClient;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        ResponseResult result = userFeignClient.findUserByUsername(s);
        JSONObject json = JSONObject.fromObject(result.getData());
        return (UserInfo)JSONObject.toBean(json, UserInfo.class);
    }


}
