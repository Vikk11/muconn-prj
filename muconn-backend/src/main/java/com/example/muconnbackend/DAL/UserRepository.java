package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Album;
import com.example.muconnbackend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>{
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User findByUsername(String username);
    List<User> findByUsernameContainingIgnoreCase(String searchQuery);
    @Query("SELECT f.follower FROM Follower f WHERE f.following.id = :userId")
    List<User> findFollowersByUserId(@Param("userId") Long userId);
    @Query("SELECT f.following FROM Follower f WHERE f.follower.id = :userId")
    List<User> findFollowingsByUserId(@Param("userId") Long userId);
}
