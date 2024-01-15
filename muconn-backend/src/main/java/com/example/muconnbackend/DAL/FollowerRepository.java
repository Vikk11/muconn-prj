package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Follower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Follower, Long> {
}
