package eplant.ajserver;

import eplant.ajserver.Model.Plant;
import eplant.ajserver.Model.User;
import eplant.ajserver.Repository.PlantRepository;
import eplant.ajserver.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PlantRepository plantRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@eplant.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                admin.setApproved(true);
                admin.setEnabled(true);
                userRepository.save(admin);

                User guest = new User();
                guest.setName("Guest User");
                guest.setEmail("user@test.com");
                guest.setPassword(passwordEncoder.encode("user123"));
                guest.setRole("USER");
                guest.setApproved(true);
                guest.setEnabled(true);
                userRepository.save(guest);
            }

            if (plantRepository.count() == 0) {
                Plant[] defaultPlants = {
                    createPlant("Monstera Deliciosa", "Indoor", "Summer", 4500, 45, "A stunning tropical plant known for its large, glossy, split leaves. Perfect for adding a jungle vibe to any room.", "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Snake Plant", "Indoor", "All-Season", 2500, 120, "One of the toughest houseplants around. Thrives in low light and requires minimal watering.", "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Fiddle Leaf Fig", "Indoor", "Spring", 6500, 8, "A designer favorite with large, violin-shaped leaves. A statement piece for any living space.", "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Peace Lily", "Indoor", "Spring", 3200, 60, "Beautiful white spathes and glossy dark green leaves. One of the best air-purifying indoor plants.", "https://images.unsplash.com/photo-1597055181300-e3633a207519?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Golden Pothos", "Indoor", "All-Season", 1800, 15, "The ultimate beginner plant with trailing vines of heart-shaped, variegated leaves.", "https://images.unsplash.com/photo-1637967886160-fd78dc3eb315?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Jade Plant", "Indoor", "Winter", 2100, 70, "A symbol of prosperity with thick, oval leaves on woody stems. Thrives in winter.", "https://images.unsplash.com/photo-1622329381622-df38d2f5341f?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Aloe Vera", "Indoor", "All-Season", 1500, 95, "A must-have succulent with healing gel inside its thick leaves. Low maintenance and multi-purpose.", "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Areca Palm", "Indoor", "All-Season", 3800, 35, "Lush, feathery palm that brings instant tropical vibes to any room. Natural air humidifier.", "https://images.unsplash.com/photo-1592150621344-22d50847ba8c?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Phalaenopsis Orchid", "Indoor", "Spring", 5200, 30, "Exquisite flowering plant with elegant arching blooms that last for months in spring.", "https://images.unsplash.com/photo-1534885391148-433dfa627883?auto=format&fit=crop&q=80&w=800"),

                    createPlant("Japanese Maple", "Outdoor", "Autumn", 9500, 12, "Elegant ornamental outdoor tree with delicate leaves that turn brilliant crimson in autumn.", "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800"),
                    createPlant("English Ivy", "Outdoor", "All-Season", 1800, 85, "Classic climbing outdoor plant with elegant lobed leaves. Perfect for walls or trellises.", "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Echeveria", "Outdoor", "Summer", 1200, 200, "Rosette-forming succulent with pastel-colored leaves. Drought-tolerant in hot summer.", "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Bird of Paradise", "Outdoor", "Summer", 7200, 5, "Dramatic plant with large banana-like leaves and striking orange-blue crane-shaped flowers.", "https://images.unsplash.com/photo-1620190892019-33827d0f1eb9?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Sweet Basil", "Outdoor", "Summer", 800, 150, "Fresh, aromatic summer herb perfect for cooking and salads.", "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Rosemary", "Outdoor", "Spring", 900, 110, "Woody, fragrant spring herb essential in any outdoor kitchen garden.", "https://images.unsplash.com/photo-1594313177694-8228148b598b?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Hibiscus", "Outdoor", "Summer", 2800, 20, "Bold, trumpet-shaped flowers in vibrant colors. Blooms abundantly throughout summer.", "https://images.unsplash.com/photo-1534567059665-3f9ee423f790?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Chrysanthemum", "Outdoor", "Autumn", 1400, 40, "Classic autumn bloom that brings vibrant gold and burgundy colors as temperatures cool.", "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=800"),
                    createPlant("Winter Jasmine", "Outdoor", "Winter", 1600, 30, "Hardy winter-blooming outdoor shrub that flowers with bright yellow stars in cold months.", "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800")
                };
                for (Plant plant : defaultPlants) {
                    plantRepository.save(plant);
                }
            } else {
                // Auto-migration for existing plants in the database
                java.util.List<Plant> existing = plantRepository.findAll();
                for (Plant p : existing) {
                    boolean updated = false;
                    if (p.getSeason() == null || p.getSeason().isBlank()) {
                        p.setSeason(assignSeason(p.getName()));
                        updated = true;
                    }
                    if (!"Indoor".equalsIgnoreCase(p.getCategory()) && !"Outdoor".equalsIgnoreCase(p.getCategory())) {
                        p.setCategory(assignEnvironment(p.getName(), p.getCategory()));
                        updated = true;
                    }
                    if (updated) {
                        plantRepository.save(p);
                    }
                }
            }
        };
    }

    private String assignSeason(String name) {
        if (name == null) return "All-Season";
        String n = name.toLowerCase();
        if (n.contains("maple") || n.contains("chrysanthemum")) return "Autumn";
        if (n.contains("jasmine") || n.contains("jade") || n.contains("marigold")) return "Winter";
        if (n.contains("basil") || n.contains("hibiscus") || n.contains("echeveria") || n.contains("paradise") || n.contains("monstera")) return "Summer";
        if (n.contains("lily") || n.contains("orchid") || n.contains("fig") || n.contains("rosemary")) return "Spring";
        return "All-Season";
    }

    private String assignEnvironment(String name, String oldCat) {
        if (name == null) return "Indoor";
        String n = name.toLowerCase();
        if (n.contains("maple") || n.contains("ivy") || n.contains("basil") || n.contains("rosemary") || n.contains("hibiscus") || n.contains("jasmine") || n.contains("chrysanthemum") || "Outdoor".equalsIgnoreCase(oldCat)) {
            return "Outdoor";
        }
        return "Indoor";
    }

    private Plant createPlant(String name, String category, String season, int price, int stock, String description, String image) {
        Plant plant = new Plant();
        plant.setName(name);
        plant.setCategory(category);
        plant.setSeason(season);
        plant.setPrice(price);
        plant.setStock(stock);
        plant.setDescription(description);
        plant.setImage(image);
        return plant;
    }
}
