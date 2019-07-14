package com.xlbs.apiservice.service.imp;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.dao.intf.I_RoleDao;
import com.xlbs.apiservice.dao.intf.I_RoleMenuDao;
import com.xlbs.apiservice.dao.intf.I_UserRoleDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.Role;
import com.xlbs.apiservice.entity.RoleMenu;
import com.xlbs.apiservice.entity.query.RoleQuery;
import com.xlbs.apiservice.service.intf.I_RoleService;
import com.xlbs.commutils.utils.RandomCodeUtils;
import com.xlbs.constantjar.RequestContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class RoleService implements I_RoleService {

    @Autowired
    private I_RoleDao roleDao;

    @Autowired
    private I_UserRoleDao userRoleDao;

    @Autowired
    private I_RoleMenuDao roleMenuDao;

    @Autowired
    private MenuService menuService;

    @Override
    public PageInfo<Role> find(RoleQuery roleQuery) {
        PageInfo<Role> pageInfo = roleDao.find(roleQuery);
        List<Role> roleList = pageInfo.getList();
        for (Role role : roleList){
            List<Menu> res = new ArrayList<>();
            if(!Objects.isNull(role.getMenuIds())){
                String[] menuIds = role.getMenuIds().split(",");
                res = menuService.findMenuByIds(menuIds);
            }
            role.setMenus(res);
        }
        return pageInfo;
    }

    @Override
    public Role findById(Long id) {
        Role role = roleDao.findById(id);
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
    @Transactional
    public void save(Role role, Boolean isEdit) {
        Long id  = null;
        if(!Objects.isNull(isEdit) && isEdit){
            id = role.getId();
            roleMenuDao.deleteRoleMenuByRoleId(id);
            roleDao.update(role);
        }else{
            id = RandomCodeUtils.getRandomId();
            role.setId(id);
            roleDao.save(role);
        }
        List<Menu> menus = role.getMenus();
        List<RoleMenu> roleMenuList = new ArrayList<>();
        for (Menu menu : menus){
            RoleMenu roleMenu = new RoleMenu();
            roleMenu.setRoleId(id);
            roleMenu.setMenuId(menu.getId());
            roleMenu.setCreatedBy(RequestContextUtils.getUserId());
            roleMenu.setCreatedDate(new Date());
            roleMenuList.add(roleMenu);
        }
        roleMenuDao.saveRoleMenus(roleMenuList);

    }

    @Override
    @Transactional
    public Boolean delete(Long id) {
        List<Role> list = userRoleDao.findRolesByRoleId(id);
        if(!list.isEmpty()){
            return false;
        }
        roleMenuDao.deleteRoleMenuByRoleId(id);
        roleDao.delete(id);
        return true;
    }

    @Override
    public List<Role> findAll() {
        return roleDao.findAll();
    }

}
