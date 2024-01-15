package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AlbumRepository extends JpaRepository<Album, Long> {
    Album findByTitle(String title);
    @Query("SELECT a FROM Album a WHERE a.artist.name = :artistName")
    List<Album> findByArtistName(@Param("artistName") String artistName);
    List<Album> findByTitleContainingIgnoreCase(String searchQuery);
}
