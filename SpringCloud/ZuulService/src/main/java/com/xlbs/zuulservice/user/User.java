package com.xlbs.zuulservice.user;

import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class User extends Entity {

    private Long userId;

    private String password;

    private String username;

    private String name;

    private Integer type;

}
