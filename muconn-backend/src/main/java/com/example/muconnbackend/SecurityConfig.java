package com.example.muconnbackend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/api/users/signup","/api/users/login", "/api/playlists/user/{userId}", "/images/playlists/**", "/images/albums/**", "/api/playlists/user/{userId}/playlist/{playlistId}", "/api/songs/playlist/{playlistId}", "/api/playlists/createPlaylist", "/api/albums/{albumTitle}", "/api/artists/{artistId}", "/api/albums/artist/{artistName}", "/api/songs/album/{albumTitle}", "/images/artists/**").permitAll()
                                .anyRequest().authenticated()
                )
                .formLogin(withDefaults())
//                .oauth2Login(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
