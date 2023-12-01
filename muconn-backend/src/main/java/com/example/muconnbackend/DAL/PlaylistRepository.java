package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    Playlist findByIdAndUser_Id(Long id, Long userId);
}
