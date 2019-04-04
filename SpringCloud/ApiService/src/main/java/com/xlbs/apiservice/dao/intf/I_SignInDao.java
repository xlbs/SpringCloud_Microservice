package com.xlbs.apiservice.dao.intf;

import com.xlbs.apiservice.entity.SignIn;

public interface I_SignInDao {

    /**
     * 通过账号登入
     * @param username 账号
     * @return
     */
    public SignIn signIn(String username);


}
