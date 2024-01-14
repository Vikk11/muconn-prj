package com.example.muconnbackend.Service;
import com.example.muconnbackend.DAL.PlaylistRepository;
import com.example.muconnbackend.DAL.UserRepository;
import com.example.muconnbackend.Model.User;
import com.example.muconnbackend.Model.UserDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private UserDto convertUserToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());

        return userDto;
    }

    public String hashPassword(String password){
        return passwordEncoder.encode(password);
    }

    public boolean isUserValid(UserDto userDto){
        boolean doesUsernameExist = userRepository.existsByUsername(userDto.getUsername());
        boolean doesEmailExist = userRepository.existsByEmail(userDto.getEmail());

        return !doesUsernameExist && !doesEmailExist;
    }

    @Transactional
    public boolean registerUser(UserDto userDto) {
        try {
            if (!isUserValid(userDto)) {
                return false;
            }

            String hashedPassword = hashPassword(userDto.getPassword());

            User user = new User();
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setPassword(hashedPassword);

            userRepository.save(user);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public UserDto findByUsername(String username){
        User user = userRepository.findByUsername(username);

        if (user == null){
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());

        return userDto;
    }

    public boolean authenticateUser(UserDto userDto){
        UserDto user = findByUsername(userDto.getUsername());
        if (user != null && passwordEncoder.matches(userDto.getPassword(), user.getPassword())){
            return true;
        }
        return false;
    }

    public boolean editUsername(Long userId, String newUsername) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if(userRepository.existsByUsername(newUsername)){
            return false;
        }

        user.setUsername(newUsername);
        userRepository.save(user);
        return true;
    }
}
