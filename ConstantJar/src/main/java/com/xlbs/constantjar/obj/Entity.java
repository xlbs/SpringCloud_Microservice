package com.xlbs.constantjar.obj;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Setter @Getter @NoArgsConstructor
public class Entity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long key;

    private Long createdBy;

    private String createdByName;

    private Date createdDate;

    private String createdDateStr;

    private Long lastModifyBy;

    private String lastModifyByName;

    private Date lastModifyDate;

    private String lastModifyDateStr;

}
