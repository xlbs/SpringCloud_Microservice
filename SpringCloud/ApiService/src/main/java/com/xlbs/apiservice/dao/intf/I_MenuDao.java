package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.Menu;

import java.util.List;

public interface I_MenuDao {

    /**
     * 查询所有菜单
     * @return
     */
    public List<Menu>  findMenu();

    /**
     * 通过用户id查询该用户所拥有的菜单
     * @param userId 用户id
     * @return
     */
    public List<Menu>  findMenuByUserId(Long userId);

    /**
     * 通过菜单id集合查询菜单
     * @param ids 菜单id集合
     * @return
     */
    public List<Menu>  findMenuByIds(String[] ids);

}
