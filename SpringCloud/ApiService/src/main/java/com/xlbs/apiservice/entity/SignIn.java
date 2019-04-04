package com.xlbs.apiservice.entity;

import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SignIn extends Entity {

    private Long userId;

    private String username;

    private String password;

    private String name;

    private Integer type;

}
