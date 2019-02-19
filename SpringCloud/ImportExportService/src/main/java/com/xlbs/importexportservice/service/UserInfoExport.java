package com.xlbs.importexportservice.service;

import com.xlbs.importexportservice.dao.intf.I_UserExportDao;
import com.xlbs.importexportservice.export.AbstractExport;
import com.xlbs.importexportservice.export.ExcelExporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;

@Component
public class UserInfoExport extends AbstractExport {

    @Autowired
    private I_UserExportDao userExportDao;

    @Override
    protected void doExport(OutputStream out, Object argument) {
        ExcelExporter excelExporter = null;
        int[] columnWidths = {1000,4000,4000,4000,4000};
        String[] headers = {"ID","编号","密码","姓名","描述"};
        excelExporter = new ExcelExporter("用户表", columnWidths, headers);
        String[] dataKeys = {"userId","userNo","userName","password","description"};
        excelExporter.fillData(dataKeys,userExportDao.findAllUser());
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
