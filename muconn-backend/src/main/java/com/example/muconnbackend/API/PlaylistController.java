package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.Album;
import com.example.muconnbackend.Model.PlaylistDto;
import com.example.muconnbackend.Service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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

    @GetMapping("/user/{userId}/playlist/{playlistId}")
    public ResponseEntity<PlaylistDto> getPlaylistDetails(@PathVariable Long userId, @PathVariable Long playlistId) {
        PlaylistDto playlist = playlistService.getPlaylistDetails(playlistId, userId);
        return new ResponseEntity<>(playlist, HttpStatus.OK);
    }
    @PostMapping("/createPlaylist")
    public ResponseEntity<String> createPlaylist(@RequestBody PlaylistDto playlistDto) {
        playlistService.createPlaylist(playlistDto);
        return ResponseEntity.ok("Playlist created successfully");
    }

    @PostMapping("/playlist/{playlistId}/addSong/{songId}")
    public ResponseEntity<String> addSongToPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        playlistService.addSongToPlaylist(playlistId, songId);
        return ResponseEntity.ok("Song added to playlist successfully");
    }

    @GetMapping("/search/playlist?query={searchQuery}")
    public List<PlaylistDto> searchPlaylistsBySearchQuery(@PathVariable String searchQuery) {
        return playlistService.findPlaylistBySearchTerm(searchQuery);
    }

}
