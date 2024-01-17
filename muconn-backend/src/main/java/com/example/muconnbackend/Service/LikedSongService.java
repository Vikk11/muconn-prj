package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.LikedSongsRepository;
import com.example.muconnbackend.Model.Follower;
import com.example.muconnbackend.Model.LikedSong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikedSongService {
    private final LikedSongsRepository likedSongsRepository;
    @Autowired
    public LikedSongService(LikedSongsRepository likedSongsRepository) {
        this.likedSongsRepository = likedSongsRepository;
    }

    public void likeSong(LikedSong song) {
        LikedSong newSong = new LikedSong();
        newSong.setUser(song.getUser());
        newSong.setSong(song.getSong());
        likedSongsRepository.save(newSong);
    }
}
