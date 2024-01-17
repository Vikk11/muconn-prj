package com.example.muconnbackend.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "playlists")
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String title;
    private LocalDate creationDate;
    private String image;
//    @OneToMany(mappedBy = "playlist")
//    private List<PlaylistSong> playlistSongs;

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

    public Playlist(){

    }

    public Playlist(String title){}

//    public List<PlaylistSong> getPlaylistSongs() {return playlistSongs;}
//
//    public void setPlaylistSongs(List<PlaylistSong> playlistSongs) {this.playlistSongs = playlistSongs;}
}
