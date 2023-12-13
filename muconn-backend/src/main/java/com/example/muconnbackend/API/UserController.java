package com.example.muconnbackend.API;
import com.example.muconnbackend.Model.UserDto;
import com.example.muconnbackend.Service.TokenService;
import com.example.muconnbackend.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;

    @Autowired
    public UserController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        boolean registrationSuccessful = userService.registerUser(userDto);

        if (registrationSuccessful) {
            System.out.println("User registered successfully: " + userDto.getUsername());
            return ResponseEntity.ok("Signed up successfully");
        } else {
            System.out.println("Username or email already taken: " + userDto.getUsername());
            return ResponseEntity.badRequest().body("Username or email is already taken.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto userDto){
        System.out.println("Received login request for user: " + userDto.getUsername());
        boolean loginSuccessful = userService.authenticateUser(userDto);

        if(loginSuccessful){
            Map<String, String> tokens = tokenService.generateTokens(userDto.getUsername());
            String accessToken = tokens.get("accessToken");
            String refreshToken = tokens.get("refreshToken");
            ResponseCookie accessTokenCookie = ResponseCookie.from("authCookie", accessToken)
                    .httpOnly(true)
                    .maxAge(Duration.ofDays(1).getSeconds())
                    .path("/")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                    .body(Map.of("accessToken", accessToken, "refreshToken", refreshToken));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log in failed");
        }
    }

    @GetMapping("/user/details")
    public ResponseEntity<?> getUserDetails(Principal principal) {
        if (principal != null) {
            String username = principal.getName();
            UserDto userDetails = userService.findByUsername(username);

            if (userDetails != null) {
                return ResponseEntity.ok(userDetails);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(@RequestParam String refreshToken) {
        try {
            // Validate the refresh token
            if (tokenService.validateToken(refreshToken)) {
                String newAccessToken = tokenService.generateToken(tokenService.getUsernameFromToken(refreshToken));

                ResponseCookie accessTokenCookie = ResponseCookie.from("authCookie", newAccessToken)
                        .httpOnly(true)
                        .maxAge(Duration.ofDays(1).getSeconds())
                        .path("/")
                        .build();

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                        .body(Map.of("accessToken", newAccessToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error refreshing token");
        }
    }

    @GetMapping("/check-auth")
    public ResponseEntity<?> checkAuthentication(HttpServletRequest request) {
        try {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("authCookie".equals(cookie.getName())) {
                        String token = cookie.getValue();
                        boolean isValid = tokenService.validateToken(token);
                        if (isValid) {
                            return ResponseEntity.ok("User is authenticated");
                        }
                    }
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error validating user authentication");
        }
    }

}
