package com.xlbs.zuulservice.config.fallback;

import com.xlbs.constantjar.RepStateCode;
import com.xlbs.constantjar.ResponseResult;
import net.sf.json.JSONObject;
import org.springframework.cloud.netflix.zuul.filters.route.FallbackProvider;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Component
public class ZuulFallback implements FallbackProvider {

    /**
     * 返回服务id，如果需要所有调用都支持回退，则return "*"或return null
     * @return
     */
    @Override
    public String getRoute() {
        return "*";
    }

    @Override
    public ClientHttpResponse fallbackResponse() {
        return null;
    }

    @Override
    public ClientHttpResponse fallbackResponse(Throwable cause) {
        return new ClientHttpResponse(){

            @Override
            public HttpHeaders getHeaders() {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON_UTF8);//和body中的内容编码一致，否则容易乱码
                return headers;
            }

            /**
             * 请求服务失败，返回信息给消费者客户端
             */
            @Override
            public InputStream getBody() throws IOException {
                ResponseResult result = ResponseResult.custom(RepStateCode.SERVICE_TIME_OUT);
                JSONObject json = JSONObject.fromObject(result);
                return new ByteArrayInputStream(json.toString().getBytes("UTF-8"));
            }

            @Override
            public HttpStatus getStatusCode() throws IOException {
                return HttpStatus.OK;
            }

            @Override
            public int getRawStatusCode() throws IOException {
                return HttpStatus.OK.value();
            }

            @Override
            public String getStatusText() throws IOException {
                return HttpStatus.OK.getReasonPhrase();
            }

            @Override
            public void close() {

            }
        };
    }
}
