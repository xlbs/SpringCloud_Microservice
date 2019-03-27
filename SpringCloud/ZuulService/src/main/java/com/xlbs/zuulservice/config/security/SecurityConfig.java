package com.xlbs.zuulservice.config.security;

import com.xlbs.zuulservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

//    @Autowired
//    private SessionTimeoutExpiredStrategy sessionTimeoutExpiredStrategy;

//    private CorsConfiguration buildConfig() {
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.addAllowedOrigin("*"); // 1允许任何域名使用
//        corsConfiguration.addAllowedHeader("*"); // 2允许任何头
//        corsConfiguration.addAllowedMethod("*"); // 3允许任何方法（post、get等）
//        return corsConfiguration;
//    }

//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", buildConfig()); // 4
//        return new CorsFilter(source);
//    }

//    @Autowired
//    private FindByIndexNameSessionRepository sessionRepository;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .antMatcher("/**")
                    .authorizeRequests()
                    .anyRequest()
                    .permitAll()
                .and()
                    .logout()
                        .logoutSuccessUrl("http://localhost:3000")
                        .logoutUrl("/logout")
                .and()
                    .csrf()
                    .disable()
                .sessionManagement()
//                    .invalidSessionUrl("/sessionTimeOut")
//                    .maximumSessions(1)
//                    .expiredSessionStrategy(sessionTimeoutExpiredStrategy)
//                    .sessionFixation().changeSessionId()
//                    .maximumSessions(1)
//                    .sessionRegistry(sessionRegistry())
        ;
    }

//    @Bean
//    SpringSessionBackedSessionRegistry sessionRegistry() {
//        return new SpringSessionBackedSessionRegistry(this.sessionRepository);
//    }


}
