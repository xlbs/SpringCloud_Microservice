package com.xlbs.constantjar.obj;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter @Getter @NoArgsConstructor
public class Entity {

    private Long createdBy;

    private Date createdDate;

    private Long lastModifyBy;

    private Date lastModifyDate;



}
