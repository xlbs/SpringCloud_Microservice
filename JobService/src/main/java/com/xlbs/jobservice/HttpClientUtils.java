package com.xlbs.jobservice;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class HttpClientUtils {

    public static String sendPostResquest(String url, Map<String,String> map) throws IOException{
        //创建httpclient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();
        //创建post方式请求对象
        HttpPost httpPost = new HttpPost(url);

        //装填参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        if(map!=null){
            for (Map.Entry<String, String> entry : map.entrySet()) {
                nvps.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
        }
        //设置参数到请求对象中
        httpPost.setEntity(new UrlEncodedFormEntity(nvps));

        System.out.println("POST Resquest Address："+url);
        System.out.println("POST Resquest Parameters："+nvps.toString());

        //设置header信息
        //指定报文头【Content-type】、【User-Agent】
        httpPost.setHeader("Content-type", "application/x-www-form-urlencoded");
        httpPost.setHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");

        //执行请求操作，并拿到结果（同步阻塞）
        CloseableHttpResponse response = httpClient.execute(httpPost);
        System.out.println("POST Response Status:: " + response.getStatusLine().getStatusCode());
        //获取结果实体
        HttpEntity entity = response.getEntity();
        String result = EntityUtils.toString(entity,"UTF-8");
        System.out.println("Resquest Result："+result);
        response.close();
        return result;

    }

    public static HttpEntity sendGetResquest(String url) throws IOException{
        //创建httpclient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();
        //创建post方式请求对象
        HttpGet httpGet = new HttpGet(url);


        System.out.println("GET Resquest Address："+url);

        //设置header信息
        //指定报文头【Content-type】、【User-Agent】
        httpGet.setHeader("Content-type", "application/x-www-form-urlencoded");
        httpGet.setHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");

        //执行请求操作，并拿到结果（同步阻塞）
        CloseableHttpResponse response = httpClient.execute(httpGet);
        System.out.println("GET Response Status:: " + response.getStatusLine().getStatusCode());

        //获取结果实体
        HttpEntity entity = response.getEntity();
//        if (entity != null) {
//            //按指定编码转换结果实体为String类型
//            body = EntityUtils.toString(entity, encoding);
//        }
//        EntityUtils.consume(entity);
        //释放链接
        response.close();
        return entity;

    }
}
