package com.xlbs.zuulservice.authentication;

import com.xlbs.zuulservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//@Configuration
public class SecurityConfigMethods_A extends WebSecurityConfigurerAdapter {

    @Autowired
    UserService userService;

//    @Autowired
//    SessionTimeoutExpiredStrategy sessionTimeoutExpiredStrategy;

    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // 1允许任何域名使用
        corsConfiguration.addAllowedHeader("*"); // 2允许任何头
        corsConfiguration.addAllowedMethod("*"); // 3允许任何方法（post、get等）
        return corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", buildConfig()); // 4
        return new CorsFilter(source);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
//                .passwordEncoder(new PasswordEncoder() {
//            @Override
//            public String encode(CharSequence charSequence) {
//                return DigestUtils.md5DigestAsHex(charSequence.toString().getBytes());
//            }
//
//            /**
//             * @param charSequence 明文
//             * @param s 密文
//             * @return
//             */
//            @Override
//            public boolean matches(CharSequence charSequence, String s) {
//                return s.equals(DigestUtils.md5DigestAsHex(charSequence.toString().getBytes()));
//            }
//        })
        ;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()//表示开启了认证规则配置
//                .antMatchers("/admin/**").hasRole("超级管理员")//表示/admin/**的路径需要有‘超级管理员’角色的用户才能访问
                .antMatchers("/sessionTimeOut").permitAll()
                .anyRequest().authenticated()//表示其他所有路径都是需要认证登录后才能访问
                .and()
                    .formLogin()
//                    .loginPage("/login_page")//用户未登入时的处理路径
                    .successHandler(new AuthenticationSuccessHandler(){
                        @Override
                        public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
                            httpServletResponse.setContentType("application/json;charset=utf-8");
                            PrintWriter out = httpServletResponse.getWriter();
                            out.write("{\"status\":\"success\",\"message\":\"登入成功\"}");
                            out.flush();
                            out.close();
                        }
                    })
                    .failureHandler(new AuthenticationFailureHandler() {
                        @Override
                        public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                            if(e instanceof InternalAuthenticationServiceException){
                                throw new InternalAuthenticationServiceException("用户名不存在");
                            }else if(e instanceof BadCredentialsException){
                                throw new BadCredentialsException("用户名或密码错误");
                            }else{
                                throw new ServletException("服务器异常");
                            }
                        }
                    })
                    .loginProcessingUrl("/loginA")//登录请求路径
                    .usernameParameter("userNo").passwordParameter("userPassword")
                    .permitAll()//表示：/loginA不需要认证
                .and()
                    .logout()
                    .permitAll()
                .and()
                    .csrf()
                    .disable()
                .sessionManagement()
                    .invalidSessionUrl("/sessionTimeOut")
                    .maximumSessions(1)
//                    .expiredSessionStrategy(sessionTimeoutExpiredStrategy)
//                .exceptionHandling().accessDeniedHandler(getAccessDeniedHandler())
        ;

    }

    @Bean
    AccessDeniedHandler getAccessDeniedHandler() {
        return new AuthenticationAccessDeniedHandler();
    }


}
