package com.example.muconnbackend.Service;

import com.example.muconnbackend.DAL.PlaylistRepository;
import com.example.muconnbackend.Model.Playlist;
import com.example.muconnbackend.Model.PlaylistDto;
import com.example.muconnbackend.Model.User;
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
    private PlaylistService playlistService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        playlistService = new PlaylistService(playlistRepository);
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
    void testCreatePlaylist() {
        PlaylistDto playlistDto = new PlaylistDto();
        playlistDto.setTitle("Test Playlist");
        playlistDto.setCreationDate(LocalDate.now());

        User user = new User();
        playlistDto.setUser(user);

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
