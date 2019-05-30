package com.xlbs.apiservice.controller;

import com.github.pagehelper.PageInfo;
import com.xlbs.apiservice.entity.User;
import com.xlbs.apiservice.entity.query.UserQuery;
import com.xlbs.apiservice.service.intf.I_UserService;
import com.xlbs.constantjar.ResponseResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/user")
public class UserController extends ResponseResult {

    @Autowired
    private I_UserService userService;

    /**
     * 分页查找
     * @param query 条件
     * @return 分页结果对象
     */
    @ApiOperation(value="分页查找")
    @GetMapping(value = "/find")
    public ResponseResult findUserList(@ModelAttribute UserQuery query){
        PageInfo<User> pageInfo = userService.find(query);
        return success(pageInfo);
    }

    /**
     * 通过标识查找
     * @param id 标识
     * @return 对象
     */
    @ApiOperation(value="通过标识查找")
    @GetMapping(value = "/find/{id}")
    public ResponseResult findById(@PathVariable(value = "id") Long id){
        User user = userService.findById(id);
        return success(user);
    }

    /**
     * 保存对象
     * @param odj 对象
     * @param isEdit 是否编辑
     * @return 操作结果信息：成功/失败
     */
    @ApiOperation(value="保存对象")
    @PostMapping(value = "/save")
    public ResponseResult save(@RequestBody User odj, @RequestParam(required = false) Boolean isEdit){
        userService.save(odj,isEdit);
        return success();
    }

    /**
     * 删除对象
     * @param id 标识
     * @return
     */
    @ApiOperation(value="删除对象")
    @GetMapping(value = "delete/{id}")
    public ResponseResult delete(@PathVariable(value = "id") Long id){
        userService.delete(id);
        return success();
    }

    /**
     * 导出系统中的用户数据
     * @return
     */
    @ApiOperation(value="导出系统中的用户数据")
    @GetMapping(value = "/export")
    public ResponseResult exportUser(){
        List<Map<Object,Object>> list = userService.exportUser();
        if(!list.isEmpty()){
            return success(list);
        }
        return success();
    }



}