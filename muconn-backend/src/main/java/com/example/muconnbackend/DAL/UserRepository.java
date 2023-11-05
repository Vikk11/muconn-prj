package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User findByUsername(String username);

}
