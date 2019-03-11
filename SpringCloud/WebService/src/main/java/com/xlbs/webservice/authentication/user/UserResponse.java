package com.xlbs.webservice.authentication.user;

public class UserResponse {

    private Long userId;

    private String username;

    private String name;

    private String description;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserResponse(Long userId, String username, String name, String description) {
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.description = description;
    }
}
