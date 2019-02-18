package com.xlbs.commutils.obj;

import java.io.Serializable;

/**
 * @author xielbs
 * @create 2018-04-23 15:46
 * @desc 保存的对象
 **/
public class SaveEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private String sql;

    private Long id;

    public SaveEntity(String sql){
        this.sql = sql;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
