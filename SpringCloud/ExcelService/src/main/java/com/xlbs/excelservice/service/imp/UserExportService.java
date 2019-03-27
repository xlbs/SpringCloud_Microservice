package com.xlbs.excelservice.service.imp;

import com.xlbs.commutils.constant.ExportMediaType;
import com.xlbs.commutils.task.async.AsynchronousTask;
import com.xlbs.commutils.export.ExportService;
import com.xlbs.constantjar.ResponseResult;
import com.xlbs.excelservice.excel.UserInfoExcel;
import com.xlbs.excelservice.service.intf.I_UserExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class UserExportService implements I_UserExportService {

    @Autowired
    private ExportService exportService;

    @Override
    @AsynchronousTask
    public ResponseResult exportUserInfo() {
        Date now = new Date();
        String fileName = exportService.getFileName("用户信息",now);
        exportService.export(fileName,1, now, MediaType.parseMediaType(ExportMediaType.APPLICATION_X_XLS).toString(),null, UserInfoExcel.class);
        return ResponseResult.success();
    }
}
