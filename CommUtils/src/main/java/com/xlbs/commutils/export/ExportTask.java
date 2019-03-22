package com.xlbs.commutils.export;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xlbs.constantjar.RequestContextUtils;
import com.xlbs.commutils.utils.SpringUtils;
import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter @Setter @NoArgsConstructor
public class ExportTask<T> extends Entity {

    private Long id;

    private String name; //文件名

    private int type; //导出模块类型

    private int status; //导出转态

    private Date startDate; //导出任务开始时间

    private Date endDate; //导出任务结束时间

    private String filePath; //文件物理位置相对路径

    private String contentType; //媒体类型信息

    @JsonIgnore
    private T argument;

    @JsonIgnore
    private Class<? extends Export> export;

    public ExportTask(long id, String name, int type, int status, Date startDate, String contentType, T argument, Class<? extends Export> export) {
        this.setId(id);
        this.name = name;
        this.type = type;
        this.status = status;
        this.startDate = startDate;
        this.contentType = contentType;
        this.argument = argument;
        this.export = export;
        this.setCreatedBy(RequestContextUtils.getUserId());
        this.setCreatedDate(new Date());
    }

    void export(){
        SpringUtils.getBean(export).export(this);
    }

    void end(int status){
        this.status = status;
        this.endDate = new Date();
    }


}
