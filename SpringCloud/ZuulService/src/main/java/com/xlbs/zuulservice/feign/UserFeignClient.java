package com.xlbs.zuulservice.feign;

import com.xlbs.constantjar.ResponseResult;
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
