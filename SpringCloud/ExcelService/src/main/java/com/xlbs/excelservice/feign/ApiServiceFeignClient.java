package com.xlbs.excelservice.feign;

import com.xlbs.constantjar.RepStateCode;
import com.xlbs.constantjar.ResponseResult;
import com.xlbs.constantjar.ServiceName;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(value = ServiceName.API_SERVICE, fallback = ApiServiceFeignFallback.class)
public interface ApiServiceFeignClient {

    @GetMapping(value = "/user/export")
    ResponseResult userExport();

}

@Component
class ApiServiceFeignFallback implements  ApiServiceFeignClient{

    @Override
    public ResponseResult userExport() {
        return ResponseResult.custom(RepStateCode.SERVICE_TIME_OUT);
    }

}
