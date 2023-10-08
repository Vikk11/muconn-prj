package com.example.muconnbackend.Service;

import com.example.muconnbackend.Model.User;
import com.example.muconnbackend.Model.UserDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.muconnbackend.DAL.UserRepository;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private BCryptPasswordEncoder passwordEncoder;
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    void testHashPassword(){
        String rawPassword = "myPassword";
        String hashedPassword = "hashedPassword";

        when(passwordEncoder.encode(rawPassword)).thenReturn(hashedPassword);

        String result = userService.hashPassword(rawPassword);

        assertEquals(hashedPassword, result);
    }

    @Test
    void isUserVaid_returnsTrue(){
        UserDto userDto = new UserDto("newUser", "newuser@example.com", "password");

        when(userRepository.existsByUsername(userDto.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(userDto.getEmail())).thenReturn(false);

        assertTrue(userService.isUserValid(userDto));
    }

    @Test
    void isUserValid_usernameExists_returnsFalse(){
        UserDto userDto = new UserDto("existingUser", "existinguser@example.com", "password");

        when(userRepository.existsByUsername(userDto.getUsername())).thenReturn(true);
        when(userRepository.existsByEmail(userDto.getEmail())).thenReturn(false);

        assertFalse(userService.isUserValid(userDto));
    }

    @Test
    void isUserValid_emailExists_returnsFalse(){
        UserDto userDto = new UserDto("existingUser", "existinguser@example.com", "password");

        when(userRepository.existsByUsername(userDto.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(userDto.getEmail())).thenReturn(true);

        assertFalse(userService.isUserValid(userDto));
    }

    @Test
    void registerUser_validUser(){
        UserDto userDto = new UserDto("newUser", "newuser@example.com", "password");
        String hashedPassword = "hashedPassword";
        User user = new User();

        when(userRepository.existsByUsername(userDto.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(userDto.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(userDto.getPassword())).thenReturn(hashedPassword);
        when(userRepository.save(any(User.class))).thenReturn(user);

        boolean result = userService.registerUser(userDto);

        assertTrue(result);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void registerUser_invalidUser(){
        UserDto userDto = new UserDto("existingUser", "existinguser@example.com", "password");

        when(userRepository.existsByUsername(userDto.getUsername())).thenReturn(true);
        when(userRepository.existsByEmail(userDto.getEmail())).thenReturn(false);

        boolean result = userService.registerUser(userDto);

        assertFalse(result);
        verify(userRepository, never()).save(any(User.class));
    }
}