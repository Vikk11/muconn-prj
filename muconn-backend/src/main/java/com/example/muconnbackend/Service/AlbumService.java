package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.AlbumRepository;
import com.example.muconnbackend.Model.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AlbumService {
    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    public Album getAlbumDetails(Long albumId) {
        return albumRepository.findById(albumId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Album not found with id " + albumId));
    }

    public Album getAlbumByTitle(String title){
        return albumRepository.findByTitle(title);
    }

    public List<Album> getAlbumsByArtist(String artistName){
        return albumRepository.findByArtistName(artistName);
    }
}
