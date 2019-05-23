package com.xlbs.apiservice.service.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;

import java.util.List;

public interface I_MenuService {

    /**
     * 通过用户id查询该用户所拥有的菜单
     * @param userId 用户id
     * @return
     */
    public List<Menu> findMenuByUserId(Long userId);

    /**
     * 查询所有菜单
     * @return
     */
    public List<Menu> findAllMenu();

    /**
     * 查询菜单列表信息
     * @param menuQuery 条件
     * @return
     */
    public PageInfo<Menu> findList(MenuQuery menuQuery);

}
