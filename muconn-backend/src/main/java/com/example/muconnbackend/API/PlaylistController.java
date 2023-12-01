package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.PlaylistDto;
import com.example.muconnbackend.Service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/playlists")
public class PlaylistController {
    private final PlaylistService playlistService;

    @Autowired
    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PlaylistDto>> getPlaylistsByUserId(@PathVariable Long userId) {
        List<PlaylistDto> playlists = playlistService.getPlaylistsByUserId(userId);
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }
}
