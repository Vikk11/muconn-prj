package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.Album;
import com.example.muconnbackend.Service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {
    private final AlbumService albumService;

    @Autowired
    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping("/{albumTitle}")
    public ResponseEntity<Album> getAlbumByTitle(@PathVariable String albumTitle) {
        Album album = albumService.getAlbumByTitle(albumTitle);
        return new ResponseEntity<>(album, HttpStatus.OK);
    }

    @GetMapping("/artist/{artistName}")
    public ResponseEntity<List<Album>> getAlbumsByArtistName(@PathVariable String artistName){
        List<Album> albums = albumService.getAlbumsByArtist(artistName);
        return new ResponseEntity<>(albums, HttpStatus.OK);
    }

    @GetMapping("/search/album?query={searchQuery}")
    public List<Album> searchAlbumsBySearchQuery(@PathVariable String searchQuery) {
        return albumService.findAlbumBySearchTerm(searchQuery);
    }
}
