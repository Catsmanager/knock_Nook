package com.hnn.knocknook.repository;

import com.hnn.knocknook.entity.InTheStreet;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
