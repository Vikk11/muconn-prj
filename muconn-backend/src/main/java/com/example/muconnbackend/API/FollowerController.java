package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.Follower;
import com.example.muconnbackend.Service.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/followers")
public class FollowerController {
    private final FollowerService followerService;

    @Autowired
    public FollowerController(FollowerService followerService) {
        this.followerService = followerService;
    }

    @PostMapping("/follow")
    public ResponseEntity<String> followUser(@RequestBody Follower follower) {
        followerService.followUser(follower);
        return ResponseEntity.ok("Followed successfully");
    }
}
