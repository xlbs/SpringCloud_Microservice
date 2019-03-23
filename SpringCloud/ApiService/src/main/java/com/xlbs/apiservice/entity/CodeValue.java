package com.xlbs.apiservice.entity;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class CodeValue {

    private String code; //数据字典的编码

    private String value; //编码对应的值

    private Integer index; //排序

}
