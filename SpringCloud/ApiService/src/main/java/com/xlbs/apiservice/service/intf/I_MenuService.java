package com.xlbs.apiservice.service.intf;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;

import java.util.List;

public interface I_MenuService {

    /**
     * 分页查找
     * @param menuQuery 条件
     * @return 分页结果对象
     */
    public PageInfo<Menu> find(MenuQuery menuQuery);

    /**
     * 保存对象
     * @param menu 对象
     * @param isEdit 是否编辑
     */
    public void save(Menu menu, Boolean isEdit);

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    public Menu findById(Long id);

    /**
     * 根据等级查找菜单
     * @param rank 等级
     * @return 菜单列表
     */
    public List<Menu> findMenuByRank(String rank);



    /**
     * 查询所有菜单
     * @return 菜单列表
     */
    public List<Menu> findAllMenu();


    /**
     * 通过用户id查询该用户所拥有的菜单
     * @param userId 用户id
     * @return 菜单列表
     */
    public List<Menu> findMenuByUserId(Long userId);



}
