package com.xlbs.apiservice.entity;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class UserInfo extends User {

    private String roleNames;

    private String createdByName;

    private String lastModifyByName;


}
