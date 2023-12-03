package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {
    Optional<Song> findById(Long id);

    @Query("SELECT s FROM PlaylistSong ps JOIN ps.song s JOIN s.album a JOIN s.artist ar WHERE ps.playlist.id = :playlistId")
    List<Song> findSongsByPlaylistId(@Param("playlistId") Long playlistId);
}
