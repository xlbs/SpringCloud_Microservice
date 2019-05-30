package com.xlbs.apiservice.dao.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;

import java.util.List;

public interface I_MenuDao {

    /**
     * 分页查找
     * @param query 条件
     * @return 菜单列表
     */
    public PageInfo<Menu> find(MenuQuery query);

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    public Menu findById(Long id);

    /**
     * 保存对象
     * @param obj 对象
     */
    public void save(Menu obj);

    /**
     * 更新对象
     * @param obj 对象
     */
    public void update(Menu obj);

    /**
     * 删除对象
     * @param id 标识
     */
    public void delete(Long id);

    /**
     * 根据等级查找菜单
     * @param rank 等级
     * @return 菜单列表
     */
    public List<Menu> findMenuByRank(String rank);

    /**
     * 通过菜单id集合查询菜单
     * @param ids 菜单id集合
     * @return 菜单列表
     */
    public List<Menu> findMenuByIds(String[] ids);

    /**
     * 查询所有菜单
     * @return 菜单列表
     */
    public List<Menu>  findAll();

    /**
     * 通过用户id查询该用户所拥有的菜单
     * @param userId 用户id
     * @return 菜单列表
     */
    public List<Menu> findMenuByUserId(Long userId);

}
