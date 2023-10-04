package com.example.muconnbackend.API;
import com.example.muconnbackend.Model.UserDto;
import com.example.muconnbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        boolean registrationSuccessful = userService.registerUser(userDto);

        if (registrationSuccessful) {
            return ResponseEntity.ok("Signed up successfully");
        } else {
            return ResponseEntity.badRequest().body("Username or email is already taken.");
        }
    }

}
