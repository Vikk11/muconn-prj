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

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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
    void isUserValid_returnsTrue(){
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

    @Test
    void findByUsername_existingUser_returnsUserDto() {
        String existingUsername = "existingUser";
        User existingUser = new User();
        existingUser.setUsername(existingUsername);
        existingUser.setEmail("existinguser@example.com");
        existingUser.setPassword("hashedPassword");

        when(userRepository.findByUsername(existingUsername)).thenReturn(existingUser);

        UserDto result = userService.findByUsername(existingUsername);

        assertNotNull(result);
        assertEquals(existingUsername, result.getUsername());
    }

    @Test
    void findByUsername_nonExistingUser_returnsNull() {
        String nonExistingUsername = "nonExistingUser";

        when(userRepository.findByUsername(nonExistingUsername)).thenReturn(null);

        UserDto result = userService.findByUsername(nonExistingUsername);

        assertNull(result);
    }

    @Test
    void findByUsername_nullUsername_returnsNull() {
        String nullUsername = null;

        UserDto result = userService.findByUsername(nullUsername);

        assertNull(result);
    }

    @Test
    void findByUsername_emptyUsername_returnsNull() {
        String emptyUsername = "";

        UserDto result = userService.findByUsername(emptyUsername);

        assertNull(result);
    }

    @Test
    void editUsername_successfulEdit_returnsTrue() {
        // Arrange
        Long userId = 1L;
        String newUsername = "newUsername";
        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(java.util.Optional.of(user));
        when(userRepository.existsByUsername(newUsername)).thenReturn(false);

        boolean result = userService.editUsername(userId, newUsername);

        assertTrue(result);
        assertEquals(newUsername, user.getUsername());
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).existsByUsername(newUsername);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void editUsername_userNotFound_throwsIllegalArgumentException() {
        Long userId = 1L;
        String newUsername = "newUsername";

        when(userRepository.findById(userId)).thenReturn(java.util.Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> userService.editUsername(userId, newUsername));

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).existsByUsername(newUsername);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void editUsername_usernameExists_returnsFalse() {
        Long userId = 1L;
        String newUsername = "existingUsername";
        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(java.util.Optional.of(user));
        when(userRepository.existsByUsername(newUsername)).thenReturn(true);

        boolean result = userService.editUsername(userId, newUsername);

        assertFalse(result);
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).existsByUsername(newUsername);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void findUserBySearchTerm_validSearchQuery_returnsMatchingUsers() {
        // Arrange
        String searchQuery = "newUser";
        List<User> matchingUsers = Arrays.asList(
                new User("newUser1", "newuser1@example.com", "password1"),
                new User("newUser2", "newuser2@example.com", "password2")
        );

        when(userRepository.findByUsernameContainingIgnoreCase(searchQuery)).thenReturn(matchingUsers);

        List<UserDto> result = userService.findUserBySearchTerm(searchQuery);

        assertEquals(matchingUsers.size(), result.size());

        assertEquals(matchingUsers.get(0).getUsername(), result.get(0).getUsername());
        assertEquals(matchingUsers.get(0).getEmail(), result.get(0).getEmail());
    }

    @Test
    void findUserBySearchTerm_noMatchingUsers_returnsEmptyList() {
        String searchQuery = "nonexistentUser";

        when(userRepository.findByUsernameContainingIgnoreCase(searchQuery)).thenReturn(Collections.emptyList());

        List<UserDto> result = userService.findUserBySearchTerm(searchQuery);

        assertEquals(0, result.size());
    }
}