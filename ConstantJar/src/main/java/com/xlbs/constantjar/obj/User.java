package com.xlbs.constantjar.obj;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class User extends Entity {

    private Long userId;

    private String userName;

    private String password;

    private String name;

    private String description;

}
