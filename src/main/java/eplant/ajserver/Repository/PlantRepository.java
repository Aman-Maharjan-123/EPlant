package eplant.ajserver.Repository;

import eplant.ajserver.Model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByCategory(String category);
    List<Plant> findBySeason(String season);
    List<Plant> findByCategoryAndSeason(String category, String season);
}
