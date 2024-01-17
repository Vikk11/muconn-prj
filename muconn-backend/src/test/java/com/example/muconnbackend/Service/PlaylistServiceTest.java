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
    void findPlaylistBySearchTerm_validSearchQuery_returnsMatchingPlaylists() {
        // Arrange
        String searchQuery = "newPlaylist";
        List<Playlist> matchingPlaylists = Arrays.asList(
                new Playlist("newPlaylist1"),
                new Playlist("newPlaylist2")
        );

        when(playlistRepository.findByTitleContainingIgnoreCase(searchQuery)).thenReturn(matchingPlaylists);

        List<PlaylistDto> result = playlistService.findPlaylistBySearchTerm(searchQuery);

        assertEquals(matchingPlaylists.size(), result.size());

        assertEquals(matchingPlaylists.get(0).getTitle(), result.get(0).getTitle());
    }

    @Test
    void findPlaylistBySearchTerm_noMatchingPlaylists_returnsEmptyList() {
        String searchQuery = "nonexistentPlaylist";

        when(playlistRepository.findByTitleContainingIgnoreCase(searchQuery)).thenReturn(Collections.emptyList());

        List<PlaylistDto> result = playlistService.findPlaylistBySearchTerm(searchQuery);

        assertEquals(0, result.size());
    }


}
