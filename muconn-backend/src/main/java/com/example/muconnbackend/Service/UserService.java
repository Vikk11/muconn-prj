package com.example.muconnbackend.Service;
import com.example.muconnbackend.DAL.IUserRepository;
import com.example.muconnbackend.Model.User;
import com.example.muconnbackend.Model.UserDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final IUserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(IUserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
}
