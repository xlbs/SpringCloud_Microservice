package com.xlbs.apiservice.entity;

import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class User extends Entity {

    private Long id;

    private String username;

    private String password;

    private String name;

    private Integer type;

    private List<Role> roles;

    private String roleName;

}
