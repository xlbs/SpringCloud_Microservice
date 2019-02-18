package com.xlbs.commutils.obj;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class Entity {

    private Long id;

    private Long createdBy;

    private Date creationDate;

    private Long lastModifyBy;

    private Date lastModifyDate;



}
