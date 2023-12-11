package com.example.muconnbackend.API;
import com.example.muconnbackend.Model.UserDto;
import com.example.muconnbackend.Service.TokenService;
import com.example.muconnbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            String token = tokenService.generateToken(userDto.getUsername());
            return ResponseEntity.ok(Map.of("token", token, "message", "Logged in successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log in failed");
        }
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        boolean isValid = tokenService.validateToken(token);

        if (isValid) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is not valid");
        }
    }

}
