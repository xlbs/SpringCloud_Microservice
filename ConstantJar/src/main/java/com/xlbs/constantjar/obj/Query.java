package com.xlbs.constantjar.obj;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
public class Query {

    private int currentPage=1;

    private int pageSize=10;

    private Long createdBy;

}
