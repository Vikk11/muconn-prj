package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    Playlist findByIdAndUser_Id(Long id, Long userId);
    List<Playlist> findAllByUser_Id(Long userId);
    @Modifying
    @Query(value = "INSERT INTO playlist_songs (playlist_id, song_id) VALUES (:playlistId, :songId)", nativeQuery = true)
    void addSongToPlaylist(@Param("playlistId") Long playlistId, @Param("songId") Long songId);

    List<Playlist> findByTitleContainingIgnoreCase(String searchQuery);

}
