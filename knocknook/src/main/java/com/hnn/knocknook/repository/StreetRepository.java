package com.hnn.knocknook.repository;

import com.hnn.knocknook.entity.Street;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StreetRepository extends JpaRepository<Street, Long> {

    @Query(value = "SELECT * FROM Street WHERE id = ?1", nativeQuery = true)
    Optional<Street> findById(int streetId);
}
