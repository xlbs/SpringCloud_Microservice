package com.xlbs.webservice.authentication.filter;

import org.springframework.stereotype.Component;

@Component
public interface I_AuthenticationService {

    public boolean authenticate();


}
