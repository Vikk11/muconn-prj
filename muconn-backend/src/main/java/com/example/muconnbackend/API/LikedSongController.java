package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.Follower;
import com.example.muconnbackend.Model.LikedSong;
import com.example.muconnbackend.Service.LikedSongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/likedsongs")
public class LikedSongController {
    private final LikedSongService likedSongService;

    @Autowired
    public LikedSongController(LikedSongService likedSongService) {
        this.likedSongService = likedSongService;
    }

    @PostMapping("/like")
    public ResponseEntity<String> likeSong(@RequestBody LikedSong song) {
        likedSongService.likeSong(song);
        return ResponseEntity.ok("Liked successfully");
    }
}
