package com.xlbs.apiservice.entity;

import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class DataDict extends Entity {

    private String category; //类别

    private String code; //数据字典的编码

    private String value; //编码对应的值

    private Integer index; //排序

}
