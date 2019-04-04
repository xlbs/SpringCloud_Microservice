package com.xlbs.zuulservice.feign;

import com.xlbs.constantjar.RepStateCode;
import com.xlbs.constantjar.ResponseResult;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.xlbs.constantjar.ServiceName;

@FeignClient(value = ServiceName.API_SERVICE, fallback = UserFeignFallback.class)
public interface UserFeignClient {

    @GetMapping(value = "/signIn")
    ResponseResult findUserByUsername(@RequestParam("username") String username);

}

@Component
class UserFeignFallback implements UserFeignClient{

    @Override
    public ResponseResult findUserByUsername(String username) {
        return ResponseResult.custom(RepStateCode.SERVICE_TIME_OUT);
    }

}
