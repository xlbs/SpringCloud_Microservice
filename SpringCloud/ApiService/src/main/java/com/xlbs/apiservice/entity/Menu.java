package com.xlbs.apiservice.entity;

import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class Menu extends Entity {

    private Integer id;

    private String name;

    private Integer parentId;

    private Integer rank;

    private String url;

    private Boolean isEnable;

    private String icon;

    private Integer index;

    private List<Menu> children;

    private String title;


}
