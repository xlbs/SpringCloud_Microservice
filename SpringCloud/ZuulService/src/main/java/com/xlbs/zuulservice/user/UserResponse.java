package com.xlbs.zuulservice.user;

import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserResponse extends Entity {

    private Long userId;

    private String username;

    private String name;

    private Integer type;

    public UserResponse(Long userId, String username, String name, Integer type) {
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.type = type;
    }
}
