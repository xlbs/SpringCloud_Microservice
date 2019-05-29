package com.xlbs.apiservice.dao.imp;

import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_RoleMenuDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.RoleMenu;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleMenuDao implements I_RoleMenuDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<Menu> findMenusByRoleId(Long roleId) {
        return sqlSession.selectList("findRoleMenu",ImmutableMap.of("roleId",roleId));
    }

    @Override
    public List<Menu> findMenusByMenuId(Long menuId) {
        return sqlSession.selectList("findRoleMenu",ImmutableMap.of("menuId",menuId));
    }

    @Override
    public void deleteRoleMenuByRoleId(Long roleId) {
        sqlSession.delete("deleteRoleMenu",ImmutableMap.of("roleId",roleId));
    }

    @Override
    public void saveRoleMenus(List<RoleMenu> roleMenus) {
        sqlSession.insert("batchSaveRoleMenu", roleMenus);
    }

}
