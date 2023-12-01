package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    Playlist findByIdAndUser_Id(Long id, Long userId);
    List<Playlist> findAllByUser_Id(Long userId);
}
