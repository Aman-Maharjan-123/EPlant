package eplant.ajserver.Controller;

import eplant.ajserver.Model.Plant;
import eplant.ajserver.Service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin
public class PlantController {

    private final PlantService plantService;

    @Autowired
    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping
    public ResponseEntity<List<Plant>> getAllPlants(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String season) {
        if (category != null && !category.isBlank() && season != null && !season.isBlank()) {
            return ResponseEntity.ok(plantService.getPlantsByCategoryAndSeason(category, season));
        } else if (category != null && !category.isBlank()) {
            return ResponseEntity.ok(plantService.getPlantsByCategory(category));
        } else if (season != null && !season.isBlank()) {
            return ResponseEntity.ok(plantService.getPlantsBySeason(season));
        }
        return ResponseEntity.ok(plantService.getAllPlants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable Long id) {
        return plantService.getPlantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Plant>> getPlantsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(plantService.getPlantsByCategory(category));
    }

    @GetMapping("/season/{season}")
    public ResponseEntity<List<Plant>> getPlantsBySeason(@PathVariable String season) {
        return ResponseEntity.ok(plantService.getPlantsBySeason(season));
    }

    @PostMapping
    public ResponseEntity<Plant> addPlant(@RequestBody Plant plant) {
        return ResponseEntity.status(HttpStatus.CREATED).body(plantService.addPlant(plant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plant> updatePlant(@PathVariable Long id, @RequestBody Plant plant) {
        return ResponseEntity.ok(plantService.updatePlant(id, plant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        plantService.deletePlant(id);
        return ResponseEntity.noContent().build();
    }
}
