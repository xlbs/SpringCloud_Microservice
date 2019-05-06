package com.xlbs.apiservice.service.imp;

import com.xlbs.apiservice.dao.intf.I_MenuDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.service.intf.I_MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class MenuService implements I_MenuService {

    @Autowired
    private I_MenuDao menuDao;

    @Override
    public List<Menu> findMenu() {
        List<Menu> menuList = menuDao.findMenu();
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
    private List<Menu> findChildMenu(List<Menu> parenMenuList, List<Menu> menuList){
        for (Menu parenMenu : parenMenuList){
            List<Menu> childMenuList = new ArrayList<>();
            for (Menu childMenu : menuList){
                if(parenMenu.getMenuId().equals(childMenu.getParentId())){
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


}
