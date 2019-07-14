package com.xlbs.apiservice.dao.imp;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.NameSpace;
import com.xlbs.apiservice.dao.intf.I_MenuDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;
import com.xlbs.constantjar.RequestContextUtils;
import com.xlbs.constantjar.SysConstant;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class MenuDao implements I_MenuDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public PageInfo<Menu> find(MenuQuery query) {
        if(!RequestContextUtils.getUserType().equals(SysConstant.SUPER_USER)){
            query.setCreatedBy(RequestContextUtils.getUserId());
        }
        return PageHelper.startPage(query.getCurrentPage(),query.getPageSize())
                .doSelectPageInfo(()->sqlSession.selectList(NameSpace.MENU_NAMESPACE+".find", query));
    }

    @Override
    public Menu findById(Long id) {
        return sqlSession.selectOne(NameSpace.MENU_NAMESPACE+".select", ImmutableMap.of("id",id));
    }

    @Override
    public void save(Menu obj) {
        obj.setCreatedBy(RequestContextUtils.getUserId());
        obj.setCreatedDate(new Date());
        sqlSession.insert(NameSpace.MENU_NAMESPACE+".save", obj);
    }

    @Override
    public void update(Menu obj) {
        obj.setLastModifyBy(RequestContextUtils.getUserId());
        obj.setLastModifyDate(new Date());
        sqlSession.update(NameSpace.MENU_NAMESPACE+".update", obj);
    }

    @Override
    public void delete(Long id) {
        sqlSession.delete(NameSpace.MENU_NAMESPACE+".delete",ImmutableMap.of("id",id));
    }

    @Override
    public List<Menu> findMenuByRank(String rank) {
        if(!RequestContextUtils.getUserType().equals(SysConstant.SUPER_USER)){
            return sqlSession.selectList(NameSpace.MENU_NAMESPACE+".select", ImmutableMap.of("rank",rank,"createdBy",RequestContextUtils.getUserId()));
        }else{
            return sqlSession.selectList(NameSpace.MENU_NAMESPACE+".select", ImmutableMap.of("rank",rank));
        }

    }

    @Override
    public List<Menu> findMenuByIds(String[] ids) {
        return sqlSession.selectList(NameSpace.MENU_NAMESPACE+".select", ImmutableMap.of("ids",ids));
    }

    @Override
    public List<Menu> findAll() {
        if(!RequestContextUtils.getUserType().equals(SysConstant.SUPER_USER)){
            return sqlSession.selectList(NameSpace.MENU_NAMESPACE+".select", ImmutableMap.of("createdBy",RequestContextUtils.getUserId()));
        }else{
            return sqlSession.selectList(NameSpace.MENU_NAMESPACE+".select");
        }
    }

    @Override
    public List<Menu> findMenuByUserId(Long userId) {
        return sqlSession.selectList(NameSpace.MENU_NAMESPACE+".findMenuByUserId", userId);
    }


}
