package com.xlbs.apiservice.dao.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;

import java.util.List;

public interface I_MenuDao {

    /**
     * 通过用户id查询该用户所拥有的菜单
     * @param userId 用户id
     * @return 菜单列表
     */
    public List<Menu> findMenuByUserId(Long userId);

    /**
     * 分页查找
     * @param menuQuery 条件
     * @return 菜单列表
     */
    public PageInfo<Menu> find(MenuQuery menuQuery);

    /**
     * 根据等级查找菜单
     * @param rank 等级
     * @return 菜单列表
     */
    public List<Menu> findMenuByRank(String rank);

    /**
     * 保存对象
     * @param menu 对象
     */
    public void save(Menu menu);

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    public Menu findById(Long id);

    /**
     * 查询所有菜单
     * @return 菜单列表
     */
    public List<Menu>  findAllMenu();



    /**
     * 通过菜单id集合查询菜单
     * @param ids 菜单id集合
     * @return 菜单列表
     */
    public List<Menu> findMenuByIds(String[] ids);

}
