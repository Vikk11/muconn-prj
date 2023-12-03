package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.PlaylistRepository;
import com.example.muconnbackend.DAL.PlaylistSongRepository;
import com.example.muconnbackend.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    private PlaylistDto convertPlaylistToPlaylistDto(Playlist playlist){
        PlaylistDto playlistDto = new PlaylistDto();
        playlistDto.setId((playlist.getId()));
        playlistDto.setUser(playlist.getUser());
        playlistDto.setTitle(playlist.getTitle());
        playlistDto.setCreationDate(playlist.getCreationDate());
        playlistDto.setImage(playlist.getImage());

        return playlistDto;
    }

    public PlaylistDto getPlaylistDetails(Long playlistId, Long userId) {
        Playlist playlist = playlistRepository.findByIdAndUser_Id(playlistId, userId);

        if (playlist == null){
            return null;
        }

        return convertPlaylistToPlaylistDto(playlist);
    }

    public List<PlaylistDto> getAllPlaylists() {
        List<Playlist> playlists = playlistRepository.findAll();
        List<PlaylistDto> playlistDTOs = new ArrayList<>();

        for (Playlist playlist : playlists) {
            PlaylistDto playlistDTO = convertPlaylistToPlaylistDto(playlist);
            playlistDTOs.add(playlistDTO);
        }

        return playlistDTOs;
    }

    public void createPlaylist(PlaylistDto playlistDto){
        Playlist playlist = new Playlist();
        playlist.setUser(playlistDto.getUser());
        playlist.setTitle(playlistDto.getTitle());
        playlist.setCreationDate(playlistDto.getCreationDate());
        playlist.setImage(playlistDto.getImage());

        playlistRepository.save(playlist);
    }

    public List<PlaylistDto> getPlaylistsByUserId(Long userId){
        List<Playlist> playlists = playlistRepository.findAllByUser_Id(userId);
        List<PlaylistDto> playlistDTOs = new ArrayList<>();

        for (Playlist playlist : playlists) {
            PlaylistDto playlistDTO = convertPlaylistToPlaylistDto(playlist);
            playlistDTOs.add(playlistDTO);
        }

        return playlistDTOs;
    }
}
