package com.xlbs.apiservice.service.intf;

import com.xlbs.apiservice.entity.SignIn;

public interface I_SignInService {

    /**
     * 通过账号登入
     * @param username 账号
     * @return
     */
    public SignIn signIn(String username);


}
