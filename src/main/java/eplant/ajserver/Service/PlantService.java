package eplant.ajserver.Service;

import eplant.ajserver.Model.Plant;
import eplant.ajserver.Repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlantService {

    private final PlantRepository plantRepository;

    @Autowired
    public PlantService(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    public Optional<Plant> getPlantById(Long id) {
        return plantRepository.findById(id);
    }

    public List<Plant> getPlantsByCategory(String category) {
        return plantRepository.findByCategory(category);
    }

    public List<Plant> getPlantsBySeason(String season) {
        return plantRepository.findBySeason(season);
    }

    public List<Plant> getPlantsByCategoryAndSeason(String category, String season) {
        return plantRepository.findByCategoryAndSeason(category, season);
    }

    public Plant addPlant(Plant plant) {
        return plantRepository.save(plant);
    }

    public Plant updatePlant(Long id, Plant plantDetails) {
        Plant plant = plantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plant not found with id: " + id));

        plant.setName(plantDetails.getName());
        plant.setCategory(plantDetails.getCategory());
        if (plantDetails.getSeason() != null && !plantDetails.getSeason().isBlank()) {
            plant.setSeason(plantDetails.getSeason());
        }
        plant.setPrice(plantDetails.getPrice());
        plant.setStock(plantDetails.getStock());
        plant.setDescription(plantDetails.getDescription());
        plant.setImage(plantDetails.getImage());

        return plantRepository.save(plant);
    }

    public void deletePlant(Long id) {
        plantRepository.deleteById(id);
    }
}
