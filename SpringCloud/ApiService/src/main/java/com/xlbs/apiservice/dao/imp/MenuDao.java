package com.xlbs.apiservice.dao.imp;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.ImmutableMap;
import com.xlbs.apiservice.dao.intf.I_MenuDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;
import com.xlbs.constantjar.RequestContextUtils;
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
    public PageInfo<Menu> find(MenuQuery menuQuery) {
        return PageHelper.startPage(menuQuery.getCurrentPage(),menuQuery.getPageSize())
                .doSelectPageInfo(()->sqlSession.selectList("find", menuQuery));
    }

    @Override
    public void save(Menu menu) {
        menu.setCreatedBy(RequestContextUtils.getUserId());
        menu.setCreatedDate(new Date());
        sqlSession.insert("save", menu);
    }

    @Override
    public Menu findById(Long id) {
        return sqlSession.selectOne("select", ImmutableMap.of("id",id));
    }

    @Override
    public List<Menu> findMenuByRank(String rank) {
        return sqlSession.selectList("select", ImmutableMap.of("rank",rank));
    }

    @Override
    public List<Menu> findAllMenu() {
        return sqlSession.selectList("select");
    }

    @Override
    public List<Menu> findMenuByIds(String[] ids) {
        return sqlSession.selectList("select", ImmutableMap.of("ids",ids));
    }

    @Override
    public List<Menu> findMenuByUserId(Long userId) {
        return sqlSession.selectList("findMenuByUserId", userId);
    }


}
