package com.xlbs.webservice.authentication.user;

public class UserResponse {

    private Long userId;

    private String userNo;

    private String userName;

    private String description;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserResponse(Long userId, String userNo, String userName, String description) {
        this.userId = userId;
        this.userNo = userNo;
        this.userName = userName;
        this.description = description;
    }
}
