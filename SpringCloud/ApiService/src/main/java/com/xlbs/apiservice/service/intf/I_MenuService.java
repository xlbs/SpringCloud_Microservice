package com.xlbs.apiservice.service.intf;

import com.xlbs.apiservice.entity.Menu;

import java.util.List;

public interface I_MenuService {

    public List<Menu> findMenuByUserId(Long userId);


}
