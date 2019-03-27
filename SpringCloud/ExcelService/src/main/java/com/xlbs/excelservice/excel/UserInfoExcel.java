package com.xlbs.excelservice.excel;

import com.xlbs.constantjar.ResponseResult;
import com.xlbs.excelservice.dao.intf.I_UserExportDao;
import com.xlbs.commutils.export.AbstractExport;
import com.xlbs.commutils.export.ExcelExporter;
import com.xlbs.excelservice.feign.ApiServiceFeignClient;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

@Component
public class UserInfoExcel extends AbstractExport {

    @Autowired
    private ApiServiceFeignClient apiServiceFeignClient;

    @Override
    protected void doExport(OutputStream out, Object argument) {
        ExcelExporter excelExporter = null;
        int[] columnWidths = {4000,4000,4000,16000,4000,8000,4000,8000};
        String[] headers = {"账号","姓名","类型","拥有的角色","创建人","创建时间","最后修改人","最后修改时间"};
        excelExporter = new ExcelExporter("用户表", columnWidths, headers);
        String[] dataKeys = {"username","name","type","roleNames","createdByName","createdDate","lastModifyByName","lastModifyDate"};
        List<Map<Object,Object>> list = new ArrayList<>();
        ResponseResult result = apiServiceFeignClient.userExport();
        if(!Objects.isNull(result.getData())){
            JSONArray json = JSONArray.fromObject(result.getData());
            System.out.println(json.toString());
            Collection collection = JSONArray.toCollection(json, Map.class);
            Iterator it = collection.iterator();
            while (it.hasNext()) {
                Map map = (Map) it.next();
                list.add(map);
            }
        }
        excelExporter.fillData(dataKeys,list);
        try {
            excelExporter.write(out);
        }catch (IOException e){
            System.out.println("excelExporter写入文件出错："+e.getMessage());
        }finally {
            try {
                if(excelExporter!=null){
                    excelExporter.close();
                }
            }catch (IOException e){
                System.out.println("excelExporter关闭连接异常："+e.getMessage());
            }
        }

    }
}
