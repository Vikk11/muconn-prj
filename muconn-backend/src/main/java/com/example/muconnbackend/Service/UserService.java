package com.example.muconnbackend.Service;
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
    }

    public UserDto findByUsername(String username){
        User user = userRepository.findByUsername(username);

        if (user == null){
            return null;
        }

        return convertUserToUserDto(user);
    }

    public boolean authenticateUser(String username, String password){
        UserDto user = findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())){
            return true;
        }
        return false;
    }
}
