package com.xlbs.commutils.storage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xlbs.constantjar.obj.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Form extends Entity {

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


}
