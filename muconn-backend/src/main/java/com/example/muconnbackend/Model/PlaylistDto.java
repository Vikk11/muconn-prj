package com.example.muconnbackend.Model;


import java.time.LocalDate;
import java.util.List;

public class PlaylistDto {
    private Long id;
    private User user;
    private String title;
    private LocalDate creationDate;
    private String image;
//    private List<PlaylistSong> songs;

    public PlaylistDto(User user, String title, LocalDate creationDate, String image) {
    }

    public PlaylistDto() {

    }

    public PlaylistDto(User user, String title){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) { this.user = user; }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

//    public List<PlaylistSong> getPlaylistSongs() {return songs;}
//
//    public void setPlaylistSongs(List<PlaylistSong> songs) {this.songs = songs;}
}
