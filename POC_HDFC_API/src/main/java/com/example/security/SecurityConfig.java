package com.example.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    // Constructor injection for jwtRequestFilter
    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .cors() // enables CORS
//                .and()
//                .csrf().disable() // Disabling CSRF as we are using stateless authentication
//                .authorizeRequests()
//                //.antMatchers(HttpMethod.GET, "/api/config/{category}/{key}").permitAll()
//                //.antMatchers(HttpMethod.GET, "/api/config/category/{category}").permitAll()
//                //.antMatchers(HttpMethod.GET, "/api/config/{id}").permitAll()
//                //.antMatchers(HttpMethod.GET, "/api/product-types/{id}").permitAll() //GET
//                //.antMatchers(HttpMethod.PUT, "/api/product-types/{id}").permitAll() //PUT
//                //.antMatchers(HttpMethod.GET, "/api/product-types/all").permitAll()
//                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                .antMatchers("/api/auth/**").permitAll()
//                //.antMatchers(
//                //        "/api/auth/login",
//                //        "/api/product-types/all",
//                //        "/api/product-types/create",
//                //        "/api/config").permitAll() // Allow these URLs without authentication
//                //.antMatchers("/api/config/**").authenticated()
//                .anyRequest().authenticated() // Require authentication for all other URLs
//                .and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // Use stateless session policy (no HTTP session)

        http
                .cors() // enables CORS
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // allow preflight requests
                .antMatchers("/api/auth/**").permitAll()            // public auth endpoints
                .anyRequest().authenticated();                      // secure everything else
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter before the default filter
        return http.build(); // Return the HttpSecurity configuration
    }
}
