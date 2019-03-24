package com.xlbs.webservice.feign;

import com.xlbs.constantjar.ResponseResult;
import com.xlbs.webservice.authentication.user.UserInfo;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.xlbs.constantjar.ServiceName;

@FeignClient(value = ServiceName.ApiService)
@RequestMapping(value = "/user")
public interface UserFeignClient {

    @RequestMapping(value = "/login")
    ResponseResult findUserByUsername(@RequestParam("username") String username);

}
