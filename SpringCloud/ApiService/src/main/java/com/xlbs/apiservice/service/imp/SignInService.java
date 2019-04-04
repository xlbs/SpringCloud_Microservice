package com.xlbs.apiservice.service.imp;

import com.xlbs.apiservice.dao.intf.I_SignInDao;
import com.xlbs.apiservice.entity.SignIn;
import com.xlbs.apiservice.service.intf.I_SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignInService implements I_SignInService {

    @Autowired
    private I_SignInDao signInDao;

    @Override
    public SignIn signIn(String username) {
        return signInDao.signIn(username);
    }

}
