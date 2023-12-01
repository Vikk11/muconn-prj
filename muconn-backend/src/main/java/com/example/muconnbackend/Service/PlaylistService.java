package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.PlaylistRepository;
import com.example.muconnbackend.DAL.PlaylistSongRepository;
import com.example.muconnbackend.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final PlaylistSongRepository playlistSongRepository;
    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository, PlaylistSongRepository playlistSongRepository) {
        this.playlistRepository = playlistRepository;
        this.playlistSongRepository = playlistSongRepository;
    }

    private PlaylistDto convertPlaylistToPlaylistDto(Playlist playlist){
        PlaylistDto playlistDto = new PlaylistDto();
        playlistDto.setId((playlist.getId()));
        playlistDto.setUser(playlist.getUser());
        playlistDto.setTitle(playlist.getTitle());
        playlistDto.setCreationDate(playlist.getCreationDate());
        playlistDto.setImage(playlist.getImage());
        playlistDto.setPlaylistSongs(playlist.getPlaylistSongs());

        return playlistDto;
    }

    public PlaylistDto getPlaylistDetails(Long playlistId, Long userId) {
        Playlist playlist = playlistRepository.findByIdAndUser_Id(playlistId, userId);

        if (playlist == null){
            return null;
        }

        return convertPlaylistToPlaylistDto(playlist);
    }

    public List<PlaylistSong> getPlaylistSongs(Long playlistId) {
        return playlistSongRepository.findByPlaylist_Id(playlistId);
    }

    public void createPlaylist(PlaylistDto playlistDto){
        Playlist playlist = new Playlist();
        playlist.setUser(playlistDto.getUser());
        playlist.setTitle(playlistDto.getTitle());
        playlist.setCreationDate(playlistDto.getCreationDate());
        playlist.setImage(playlistDto.getImage());
        playlist.setPlaylistSongs(playlistDto.getPlaylistSongs());

        playlistRepository.save(playlist);
    }
}
