package com.xlbs.apiservice.entity;

import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Menu extends Entity {

    private Integer menuId;

    private String name;

    private Integer parentId;

    private Integer rank;

    private String url;

    private Boolean isEnable;

    private Integer index;


}
