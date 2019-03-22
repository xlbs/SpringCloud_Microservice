package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.Menu;

import java.util.List;

public interface I_MenuDao {

    public List<Menu>  findMenuByUserId(Long userId);

}
