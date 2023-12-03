package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.Song;
import com.example.muconnbackend.Service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    private final SongService songService;
    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }
    @GetMapping("/{playlistId}")
    public ResponseEntity<List<Song>> getSongsByPlaylistId(@PathVariable Long playlistId) {
        List<Song> songs = songService.getSongsByPlaylistId(playlistId);
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
}
