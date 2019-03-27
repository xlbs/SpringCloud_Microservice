package com.xlbs.zuulservice.config.filter;

import org.springframework.stereotype.Component;

@Component
public interface I_AuthenticationService {

    public boolean authenticate();


}
