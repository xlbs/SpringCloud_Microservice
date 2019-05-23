package com.xlbs.apiservice.dao.imp;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.dao.intf.I_MenuDao;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MenuDao implements I_MenuDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<Menu> findAllMenu() {
        return sqlSession.selectList("findMenu");
    }

    @Override
    public List<Menu> findMenuByUserId(Long userId) {
        return sqlSession.selectList("findMenuByUserId", userId);
    }

    @Override
    public List<Menu> findMenuByIds(String[] ids) {
        return sqlSession.selectList("findMenuByIds", ids);
    }

    @Override
    public PageInfo<Menu> findList(MenuQuery menuQuery) {
        return PageHelper.startPage(menuQuery.getCurrentPage(),menuQuery.getPageSize())
                .doSelectPageInfo(()->sqlSession.selectList("findMenu", menuQuery));
    }
}
