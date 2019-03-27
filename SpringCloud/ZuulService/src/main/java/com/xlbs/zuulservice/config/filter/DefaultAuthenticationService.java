package com.xlbs.zuulservice.config.filter;

import com.netflix.zuul.context.RequestContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xlbs.constantjar.SessionConstant;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DefaultAuthenticationService implements I_AuthenticationService {

    @Override
    public boolean authenticate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> userAuthentication = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        if(userAuthentication.stream().anyMatch(authority -> Objects.equals(authority, "ROLE_ANONYMOUS"))){
            return false;
        }else{
            RequestContext requestContext = RequestContext.getCurrentContext();
            HttpSession session = requestContext.getRequest().getSession();
            requestContext.addZuulRequestHeader(SessionConstant.USER_ID, session.getAttribute(SessionConstant.USER_ID).toString());
            requestContext.addZuulRequestHeader(SessionConstant.USERNAME, session.getAttribute(SessionConstant.USERNAME).toString());
            requestContext.addZuulRequestHeader(SessionConstant.NAME, session.getAttribute(SessionConstant.NAME).toString());
            requestContext.addZuulRequestHeader(SessionConstant.USER_TYPE, session.getAttribute(SessionConstant.USER_TYPE).toString());
            return true;
        }
    }


}
