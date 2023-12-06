package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.ArtistRepository;
import com.example.muconnbackend.Model.Artist;
import com.example.muconnbackend.Model.User;
import com.example.muconnbackend.Model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;

    @Autowired
    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }
    public Artist getArtistDetails(Long artistId) {
        return artistRepository.findById(artistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artist not found with id " + artistId));
    }


    public Artist getArtistByName(String name){
        return artistRepository.findByName(name);
    }
}
