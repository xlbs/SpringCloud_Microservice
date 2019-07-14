package com.xlbs.apiservice.service.imp;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.dao.intf.I_MenuDao;
import com.xlbs.apiservice.dao.intf.I_RoleMenuDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;
import com.xlbs.apiservice.service.intf.I_MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class MenuService implements I_MenuService {

    @Autowired
    private I_MenuDao menuDao;

    @Autowired
    private I_RoleMenuDao roleMenuDao;

    @Override
    public PageInfo<Menu> find(MenuQuery menuQuery) {
        PageInfo<Menu> pageInfo = menuDao.find(menuQuery);
        List<Menu> menuList = pageInfo.getList();
        List<Menu> oneLevelMenuList = new ArrayList<>();
        for (Menu menu : menuList){
            if(Objects.isNull(menu.getParentId())){
                oneLevelMenuList.add(menu);
            }
        }
        List<Menu> resList = findChildMenu(oneLevelMenuList,menuList);
        pageInfo.setList(resList);
        return pageInfo;
    }

    @Override
    public Menu findById(Long id) {
        return menuDao.findById(id);
    }

    @Override
    @Transactional
    public void save(Menu menu, Boolean isEdit) {
        if(!Objects.isNull(isEdit) && isEdit){
            menuDao.update(menu);
        }else{
            menuDao.save(menu);
        }
    }

    @Override
    public Boolean delete(Long id) {
        List<Menu> list = roleMenuDao.findMenusByMenuId(id);
        if(!list.isEmpty()){
            return false;
        }
        menuDao.delete(id);
        return true;
    }

    @Override
    public List<Menu> findMenuByRank(String rank) {
        return menuDao.findMenuByRank(rank);
    }

    @Override
    public List<Menu> findAll() {
        List<Menu> menuList = menuDao.findAll();
        List<Menu> oneLevelMenuList = new ArrayList<>();
        for (Menu menu : menuList){
            if(Objects.isNull(menu.getParentId())){
                oneLevelMenuList.add(menu);
            }
        }
        List<Menu> resList = findChildMenu(oneLevelMenuList,menuList);
        return resList;
    }

    @Override
    public List<Menu> findMenuByUserId(Long userId) {
        List<Menu> menuList = menuDao.findMenuByUserId(userId);
        List<Menu> oneLevelMenuList = new ArrayList<>();
        for (Menu menu : menuList){
            if(Objects.isNull(menu.getParentId())){
                oneLevelMenuList.add(menu);
            }
        }
        List<Menu> resList = findChildMenu(oneLevelMenuList,menuList);
        return resList;
    }



    /**
     * 找到子菜单
     * @param parenMenuList 父菜单列表
     * @param menuList 菜单列表
     * @return
     */
    public List<Menu> findChildMenu(List<Menu> parenMenuList, List<Menu> menuList){
        for (Menu parenMenu : parenMenuList){
            List<Menu> childMenuList = new ArrayList<>();
            for (Menu childMenu : menuList){
                if(parenMenu.getId().equals(childMenu.getParentId())){
                    childMenuList.add(childMenu);
                }
            }
            parenMenu.setChildren(childMenuList);
            if(!parenMenu.getChildren().isEmpty()){
                findChildMenu(parenMenu.getChildren(), menuList);
            }
        }
        return parenMenuList;
    }

    /**
     * 通过菜单id集合查询菜单
     * @param ids 菜单id集合
     * @return
     */
    public List<Menu> findMenuByIds(String[] ids){
        List<Menu> menuList = menuDao.findMenuByIds(ids);
        List<Menu> oneLevelMenuList = new ArrayList<>();
        for (Menu menu : menuList){
            if(Objects.isNull(menu.getParentId())){
                oneLevelMenuList.add(menu);
            }
        }
        List<Menu> resList = findChildMenu(oneLevelMenuList,menuList);
        return resList;
    }


}
