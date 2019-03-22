package com.xlbs.constantjar.obj;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class RequestContext {

    private Long userId;

    private String username;

    private String name;

    private Integer userType;


}
