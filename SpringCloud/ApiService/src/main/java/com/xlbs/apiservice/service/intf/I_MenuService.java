package com.xlbs.apiservice.service.intf;

import com.xlbs.apiservice.entity.Menu;

import java.util.List;

public interface I_MenuService {

    /**
     * 查询所有菜单
     * @return
     */
    public List<Menu> findMenus();

    /**
     * 通过用户id查询该用户所拥有的菜单
     * @param userId 用户id
     * @return
     */
    public List<Menu> findMenuByUserId(Long userId);


}
