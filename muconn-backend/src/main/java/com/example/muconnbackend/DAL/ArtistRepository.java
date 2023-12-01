package com.example.muconnbackend.DAL;

import com.example.muconnbackend.Model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Optional<Artist> findById(Long id);
}
