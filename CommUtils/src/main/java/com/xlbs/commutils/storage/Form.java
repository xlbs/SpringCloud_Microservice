package com.xlbs.commutils.storage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
public class Form {

    private Long id;

    private Long formId;

    private String formCode;

    private Boolean valid;

    @JsonIgnore
    private String filePath;

    @JsonIgnore
    private Boolean removed;

    private Boolean replace = false;

    private int version = 1;

    private Long createdBy;

    private Date creationDate;

    private Long lastModifyBy;

    private Date lastModifyDate;

}
