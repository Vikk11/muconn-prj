package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.PlaylistRepository;
import com.example.muconnbackend.DAL.PlaylistSongRepository;
import com.example.muconnbackend.Model.Playlist;
import com.example.muconnbackend.Model.PlaylistDto;
import com.example.muconnbackend.Model.PlaylistSong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

class PlaylistServiceTest {
    @Mock
    private PlaylistRepository playlistRepository;
    @Mock
    private PlaylistSongRepository playlistSongRepository;
    private PlaylistService playlistService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        playlistService = new PlaylistService(playlistRepository, playlistSongRepository);
    }

    @Test
    void testGetPlaylistDetails() {
        Long playlistId = 1L;
        Long userId = 1L;

        Playlist playlist = new Playlist();
        playlist.setId(playlistId);
        playlist.setTitle("Test Playlist");
        playlist.setCreationDate(LocalDate.now());
        playlist.setImage("image/path");

        when(playlistRepository.findByIdAndUser_Id(playlistId, userId)).thenReturn(playlist);

        PlaylistDto result = playlistService.getPlaylistDetails(playlistId, userId);

        assertNotNull(result);
        assertEquals(playlistId, result.getId());
        assertEquals("Test Playlist", result.getTitle());
        assertEquals("image/path", result.getImage());

        verify(playlistRepository, times(1)).findByIdAndUser_Id(playlistId, userId);
    }

    @Test
    void testGetPlaylistSongs() {
        // Arrange
        Long playlistId = 1L;

        PlaylistSong song1 = new PlaylistSong();
        song1.setId(1L);

        PlaylistSong song2 = new PlaylistSong();
        song2.setId(2L);

        when(playlistSongRepository.findByPlaylist_Id(playlistId)).thenReturn(Arrays.asList(song1, song2));

        List<PlaylistSong> result = playlistService.getPlaylistSongs(playlistId);

        assertNotNull(result);
        assertEquals(2, result.size());

        verify(playlistSongRepository, times(1)).findByPlaylist_Id(playlistId);
    }

    @Test
    void testCreatePlaylist() {
        PlaylistDto playlistDto = new PlaylistDto();
        playlistDto.setTitle("Test Playlist");
        playlistDto.setCreationDate(LocalDate.now());
        playlistDto.setImage("image/path");
        playlistDto.setPlaylistSongs(Collections.emptyList());

        playlistService.createPlaylist(playlistDto);

        verify(playlistRepository, times(1)).save(any(Playlist.class));
    }

    @Test
    void testGetAllPlaylists() {
        // Mock data
        Playlist playlist1 = new Playlist();
        playlist1.setId(1L);
        playlist1.setTitle("Playlist 1");
        playlist1.setImage("/path/to/image1");

        Playlist playlist2 = new Playlist();
        playlist2.setId(2L);
        playlist2.setTitle("Playlist 2");
        playlist2.setImage("/path/to/image2");

        List<Playlist> mockPlaylists = Arrays.asList(playlist1, playlist2);

        when(playlistRepository.findAll()).thenReturn(mockPlaylists);

        List<PlaylistDto> result = playlistService.getAllPlaylists();

        verify(playlistRepository, times(1)).findAll();
    }
}
