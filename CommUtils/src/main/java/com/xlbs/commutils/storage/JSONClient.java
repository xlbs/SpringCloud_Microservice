package com.xlbs.commutils.storage;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.HttpStatus;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.StandardHttpRequestRetryHandler;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class JSONClient implements DisposableBean {

    private final String assignUrl;

    private final String digestPrefix = "Coralreef-fs";

    private final CloseableHttpClient httpClient;

    private final TypeReference<List<JSONFile>> coralreefTypeRef = new TypeReference<List<JSONFile>>() {};

    @Autowired
    private ObjectMapper objectMapper;

    public JSONClient(@Value("${app.json.groupId}") String groupId, @Value("${app.json.serverUrl}")String serverUrl){
        this.assignUrl = String.format("%s/fs/master/dir/assign?gid=%s", serverUrl, groupId);

        PoolingHttpClientConnectionManager poolHccm = new PoolingHttpClientConnectionManager(60L, TimeUnit.SECONDS);
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectionRequestTimeout(10*1000)
                .setConnectTimeout(10*1000)
                .setSocketTimeout(10*1000)
                .build();

        httpClient = HttpClients.custom()
                .setConnectionManager(poolHccm)
                .setDefaultRequestConfig(requestConfig)
                .setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy())
                .setRetryHandler(new StandardHttpRequestRetryHandler())
                .build();


    }

    public JSONFile saveJsonFile(String fileName, InputStream body, Long createdBy) throws IOException{
        Volume volume = assign();
        String server = String.format("http://%s:%d", volume.getHost(),volume.getPort());
        String url = String.format("%s/file?fid=&createdBy=%d", server,createdBy);
        return save(url,fileName,body);
    }


    public String makeDigest(String filePath, Long createdBy){
        return DigestUtils.sha1Hex(String.format("%s:%s:%d", digestPrefix,filePath.substring(2),createdBy));
    }



    @Override
    public void destroy() throws Exception {

    }

    private Volume assign() throws IOException{
        try(CloseableHttpResponse response = httpClient.execute(new HttpGet(assignUrl))){
            if(response.getStatusLine().getStatusCode() != HttpStatus.SC_OK){
                throw new IOException(EntityUtils.toString(response.getEntity()));
            }
            return objectMapper.readValue(response.getEntity().getContent(), Volume.class);
        }
    }

    private JSONFile save(String url, String fileName, InputStream content) throws IOException {
        HttpPost request = new HttpPost(url);
        request.setEntity(MultipartEntityBuilder.create()
                .addBinaryBody("file",content,ContentType.DEFAULT_BINARY,fileName)
                .build()
        );
        try(CloseableHttpResponse response = httpClient.execute(request)) {
            if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK){
                throw new IOException(EntityUtils.toString(response.getEntity()));
            }
           return objectMapper.<List<JSONFile>>readValue(response.getEntity().getContent(), coralreefTypeRef).get(0);
        }

    }


}
