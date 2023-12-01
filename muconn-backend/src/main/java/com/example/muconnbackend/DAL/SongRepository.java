package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {
    Optional<Song> findById(Long id);
}
