package com.xlbs.webservice.feign;

import com.xlbs.webservice.authentication.user.UserInfo;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import xlbs.com.constantjar.ServiceName;

@FeignClient(value = ServiceName.ApiService)
@RequestMapping(value = "/sysUser")
public interface UserFeignClient {

    @RequestMapping(value = "/findUserByUserNo",method={RequestMethod.POST})
    UserInfo findUserByUserNo(@RequestParam("userNo") String userNo);

}
