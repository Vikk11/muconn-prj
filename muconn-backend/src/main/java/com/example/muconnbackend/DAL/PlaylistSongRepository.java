package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.PlaylistSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, Long> {
//    List<PlaylistSong> findByPlaylist_Id(Long playlistId);
}
