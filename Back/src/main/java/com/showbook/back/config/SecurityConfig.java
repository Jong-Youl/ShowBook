package com.showbook.back.config;

import com.showbook.back.security.handlers.JwtAuthenticationEntryPoint;
import com.showbook.back.security.handlers.OAuth2FailureHandler;
import com.showbook.back.security.handlers.OAuth2SuccessHandler;
import com.showbook.back.security.jwt.JwtAuthenticationFilter;
import com.showbook.back.security.jwt.JwtTokenUtil;
import com.showbook.back.security.service.CustomOAuth2UserService;
import com.showbook.back.service.MemberService;
import com.showbook.back.service.RefreshTokenService;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
@Slf4j
public class SecurityConfig {

    private final JwtTokenUtil jwtTokenUtil;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2FailureHandler oAuth2FailureHandler;
    private final CorsFilter corsFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        log.info("SecurityConfig - 필터체인 시작");
        http
            .authorizeHttpRequests(request -> request
                    // permitAll() -> 인증요청 시 필터를 거칠 때 예외가 터져도 무시할 뿐, 필터를 거친다!
                            .requestMatchers("/auth/token","/auth/logout","/member/signup").permitAll()
                            .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
                            .anyRequest().authenticated()
            )
            .csrf(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(exception -> exception
                    .authenticationEntryPoint(jwtAuthenticationEntryPoint))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .oauth2Login(oauth -> // oauth2로그인에 대한 여러 설정의 진입점
                    // oauth2 로그인 성공 이후 사용자 정보를 가져올 때 설정 담당
                    oauth.userInfoEndpoint(c -> c.userService(customOAuth2UserService))
                    // 로그인 성공 시 핸들러
                            .successHandler(oAuth2SuccessHandler)
                            .failureHandler(oAuth2FailureHandler)
                    )
            .addFilterBefore(corsFilter,UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenUtil,memberService,refreshTokenService),
                UsernamePasswordAuthenticationFilter.class)
            ;

        return http.build();
    }



}
