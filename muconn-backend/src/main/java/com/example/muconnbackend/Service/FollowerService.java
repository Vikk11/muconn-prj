package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.FollowerRepository;
import com.example.muconnbackend.Model.Follower;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowerService {
    private final FollowerRepository followerRepository;
    @Autowired
    public FollowerService(FollowerRepository followerRepository) {
        this.followerRepository = followerRepository;
    }

    public void followUser(Follower follower) {
        Follower newFollower = new Follower();
        newFollower.setFollower(follower.getFollower());
        newFollower.setFollowing(follower.getFollowing());
        followerRepository.save(newFollower);
    }
}
