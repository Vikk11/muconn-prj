package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.Follower;
import com.example.muconnbackend.Model.LikedSong;
import com.example.muconnbackend.Service.LikedSongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/unlike")
    public ResponseEntity<String> unlikeSong(@RequestBody LikedSong song) {
        likedSongService.unlikeSong(song);
        return ResponseEntity.ok("Song unliked successfully.");
    }
}
