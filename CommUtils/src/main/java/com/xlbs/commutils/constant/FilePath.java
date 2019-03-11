package com.xlbs.commutils.constant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class FilePath {

    @Value("${app.disk-path}")
    private static String rootPath;

    @Autowired
    public FilePath(@Value("${app.disk-path}") String path){
        this.rootPath = String.format("%s", path);
    }

    public static String getExportPath(){
        return String.format("%s/export", rootPath);
    }

    public static String getTaskPath(){
        return String.format("%s/task", rootPath);
    }

    public static String getAttachmentPath(){
        return String.format("%s/attachment", rootPath);
    }



}
