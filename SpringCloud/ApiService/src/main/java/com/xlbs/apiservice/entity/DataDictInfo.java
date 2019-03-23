package com.xlbs.apiservice.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter @Getter
public class DataDictInfo {

    private String category; //类别

    private List<CodeValue> list; //列表

}
