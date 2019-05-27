package com.xlbs.apiservice.controller;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.Menu;
import com.xlbs.apiservice.entity.query.MenuQuery;
import com.xlbs.apiservice.service.intf.I_MenuService;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/menu")
public class MenuController extends ResponseResult {

    @Autowired
    private I_MenuService menuService;

    /**
     * 分页查找
     * @param menuQuery 条件
     * @return 分页结果对象
     */
    @ApiOperation(value="分页查找")
    @PostMapping(value = "/find")
    public ResponseResult find(@RequestBody MenuQuery menuQuery){
        PageInfo<Menu> pageInfo = menuService.find(menuQuery);
        return success(pageInfo);
    }

    /**
     * 保存对象
     * @param menu 对象
     * @param isEdit 是否编辑
     * @return 操作结果信息：成功/失败
     */
    @ApiOperation(value="保存")
    @PostMapping(value = "/save")
    public ResponseResult save(@RequestBody Menu menu, @RequestParam(required = false) Boolean isEdit){
        menuService.save(menu,isEdit);
        return success();
    }

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    @ApiOperation(value="通过标识查找")
    @GetMapping(value = "/find/{id}")
    public ResponseResult findById(@PathVariable(value = "id") Long id){
        Menu menu = menuService.findById(id);
        return success(menu);
    }

    /**
     * 根据等级查找菜单
     * @param rank 等级
     * @return 菜单列表
     */
    @ApiOperation(value="根据等级查找菜单")
    @GetMapping(value = "/findMenuByRank")
    public ResponseResult findMenuByRank(@RequestParam(value = "rank") String rank){
        List<Menu> list = menuService.findMenuByRank(rank);
//        try {
//            Thread.sleep(10000);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
        if(!list.isEmpty()){
            return super.success(list);
        }
        return super.success();
    }



    /**
     * 查询所有的菜单
     * @return 菜单列表
     */
    @ApiOperation(value="查询所有的菜单")
    @GetMapping(value = "/all")
    public ResponseResult findAllMenu(){
        List<Menu> list = menuService.findAllMenu();
        if(!list.isEmpty()){
            return super.success(list);
        }
        return super.success();
    }



    /**
     * 根据用户ID查找该用户所拥有的菜单
     * @param userId 用户id
     * @return 菜单列表
     */
    @ApiOperation(value="根据用户Id查找该用户所拥有的菜单")
    @GetMapping(value = "/{userId}")
    public ResponseResult findMenuByUserId(@PathVariable Long userId){
        List<Menu> list = menuService.findMenuByUserId(userId);
        if(!list.isEmpty()){
            return super.success(list);
        }
        return super.success();
    }


}