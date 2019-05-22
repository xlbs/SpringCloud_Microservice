package com.xlbs.apiservice.service.imp;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.dao.intf.I_RoleMenuDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.query.RoleQuery;
import com.xlbs.apiservice.service.intf.I_RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class RoleService implements I_RoleService {

    @Autowired
    private I_RoleDao roleDao;

    @Autowired
    private I_RoleMenuDao roleMenuDao;

    @Autowired
    private MenuService menuService;

    @Override
    public PageInfo<Role> findList(RoleQuery roleQuery) {
        return roleDao.findList(roleQuery);
    }

    @Override
    public Role findRoleById(Long id) {
        Role role = roleDao.findRoleById(id);
//        List<Menu> roleMenus = new ArrayList<>();
        List<Menu> menuList = roleMenuDao.findMenusByRoleId(id);
        List<Menu> oneLevelMenuList = new ArrayList<>();
        for (Menu menu : menuList){
            if(Objects.isNull(menu.getParentId())){
                oneLevelMenuList.add(menu);
            }
        }
        List<Menu> roleMenus = menuService.findChildMenu(oneLevelMenuList,menuList);
        role.setMenus(roleMenus);
        return role;
    }

    @Override
    public List<Role> findRoles() {
        return roleDao.findRoles();
    }

}
