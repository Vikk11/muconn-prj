package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.PlaylistSongRepository;
import com.example.muconnbackend.DAL.SongRepository;
import com.example.muconnbackend.Model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SongService {
    private final SongRepository songRepository;

    @Autowired
    public SongService(SongRepository songRepository){
        this.songRepository = songRepository;
    }

    public Song getSongDetails(Long songId) {
        return songRepository.findById(songId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Song not found with id " + songId));
    }

    public List<Song> getSongsByPlaylistId(Long playlistId) {
        return songRepository.findSongsByPlaylistId(playlistId);
    }

    public List<Song> getSongsByAlbumTitle(String albumTitle){
        return songRepository.findByAlbumTitle(albumTitle);
    }
}
