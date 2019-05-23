package com.xlbs.apiservice.entity;

import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class Role extends Entity {

    private Long id;

    private String name;

    private List<Menu> menus;

    private String menuIds;

    private String menuName;



}
