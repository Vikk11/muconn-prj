package com.example.muconnbackend.API;

import com.example.muconnbackend.Model.Album;
import com.example.muconnbackend.Model.Artist;
import com.example.muconnbackend.Service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artists")
public class ArtistController {
    private final ArtistService artistService;

    @Autowired
    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<Artist> getArtistById(@PathVariable Long artistId) {
        Artist artist = artistService.getArtistDetails(artistId);
        return new ResponseEntity<>(artist, HttpStatus.OK);
    }

    @GetMapping("/search/artist")
    public List<Artist> searchArtistsBySearchQuery(@RequestParam String query) {
        return artistService.findArtistBySearchTerm(query);
    }
}
