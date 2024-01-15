package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Album;
import com.example.muconnbackend.Model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Artist findByName(String name);
    List<Artist> findByNameContainingIgnoreCase(String searchQuery);
}
