package com.example.muconnbackend;

import com.example.muconnbackend.Service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Autowired
    private TokenService tokenService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/api/users/signup","/api/users/login", "/api/playlists/user/{userId}", "/images/playlists/**", "/images/albums/**", "/api/playlists/user/{userId}/playlist/{playlistId}", "/api/songs/playlist/{playlistId}", "/api/albums/{albumTitle}", "/api/artists/{artistId}", "/api/albums/artist/{artistName}", "/api/songs/album/{albumTitle}", "/images/artists/**", "/api/users/check-auth", "/api/users/user/details/{username}", "/api/users/refresh-token", "/api/playlists/createPlaylist", "/api/playlists/playlist/{playlistId}/addSong/{songId}").permitAll()
                                .anyRequest().authenticated()
                )
                .formLogin(withDefaults())
//                .oauth2Login(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .addFilterBefore(new JwtAuthenticationFilter(tokenService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
