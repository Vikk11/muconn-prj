package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.LikedSong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedSongsRepository extends JpaRepository<LikedSong, Long> {
}
