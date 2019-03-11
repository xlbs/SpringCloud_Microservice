package com.xlbs.webservice.authentication.user;

public class UserResponse {

    private Long userId;

    private String userName;

    private String name;

    private String description;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public UserResponse(Long userId, String userName, String name, String description) {
        this.userId = userId;
        this.userName = userName;
        this.name = name;
        this.description = description;
    }
}
