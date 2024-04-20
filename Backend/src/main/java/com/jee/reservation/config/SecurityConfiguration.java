package com.jee.reservation.config;

import com.jee.reservation.filters.JwtAuthenticationFilter;
import com.jee.reservation.services.MyUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final MyUserDetailsService userDetailsService;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(MyUserDetailsService userDetailsService,
                                 JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(AbstractHttpConfigurer::disable) // disable csrf
                .authorizeHttpRequests(authorizeRequests -> {


                            /*      RESERVATION        */

                            authorizeRequests.requestMatchers(HttpMethod.POST, "reservation/**").authenticated();

                            authorizeRequests.requestMatchers(HttpMethod.GET, "reservation/guest/**").authenticated();

                            authorizeRequests.requestMatchers("reservation/**").hasAuthority("ADMIN");

                            /*     CHAMBRE     */
                            authorizeRequests.requestMatchers(HttpMethod.GET, "/chambre/**").permitAll();
                            authorizeRequests.requestMatchers("chambre/**").hasAuthority("ADMIN");

                            /*     AUTRES      */
                            authorizeRequests.requestMatchers("/v3/api-docs/**",
                                    "/swagger-ui/**").permitAll();
                            authorizeRequests.requestMatchers(HttpMethod.POST, "/register/**").permitAll();
                            authorizeRequests.requestMatchers(HttpMethod.POST, "/login/**").permitAll();

                            authorizeRequests.requestMatchers(HttpMethod.GET, "/users/**").permitAll();
                            authorizeRequests.requestMatchers(HttpMethod.PUT, "/users/**").permitAll();


                            authorizeRequests.requestMatchers("/users/**").hasAuthority("ADMIN");

                            authorizeRequests.requestMatchers(HttpMethod.GET, "/").permitAll();
                            authorizeRequests.anyRequest().authenticated();
                        }
                )
                .userDetailsService(userDetailsService)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


}
