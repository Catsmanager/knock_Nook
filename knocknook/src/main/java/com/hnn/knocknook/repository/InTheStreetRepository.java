package com.hnn.knocknook.repository;

import com.hnn.knocknook.entity.InTheStreet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InTheStreetRepository extends JpaRepository<InTheStreet, Long> {

    @Query(value = "SELECT * FROM InTheStreet WHERE street_id = ?1 AND kindof = '식당' ORDER BY RAND() LIMIT 1",
            nativeQuery = true)
    Optional<InTheStreet> findRestaurantById(int id);

    @Query(value = "SELECT * FROM InTheStreet WHERE street_id = ?1 AND kindof = '카페' ORDER BY RAND() LIMIT 1",
            nativeQuery = true)
    Optional<InTheStreet> findCafeById(int id);

    @Query(value = "SELECT * FROM InTheStreet WHERE street_id = ?1 AND kindof = '기타' ORDER BY RAND() LIMIT 1",
            nativeQuery = true)
    Optional<InTheStreet> findEtcById(int id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE InTheStreet i SET i.liked = i.liked + 1 WHERE i.id = ?1", nativeQuery = true)
    void incrementLiked(Long id);

    @Query(value = "SELECT i.liked FROM InTheStreet i WHERE i.id = ?1", nativeQuery = true)
    Integer findLikedById(Long id);
}
