package eplant.ajserver.Controller;

import eplant.ajserver.Model.Order;
import eplant.ajserver.Model.User;
import eplant.ajserver.Repository.UserRepository;
import eplant.ajserver.Service.EmailService;
import eplant.ajserver.Service.OrderService;
import eplant.ajserver.Service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final UserRepository userRepository;
    private final PlantService plantService;
    private final OrderService orderService;
    private final EmailService emailService;

    @Autowired
    public AdminController(UserRepository userRepository, PlantService plantService, OrderService orderService, EmailService emailService) {
        this.userRepository = userRepository;
        this.plantService = plantService;
        this.orderService = orderService;
        this.emailService = emailService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalUsers = userRepository.count();
        long totalPlants = plantService.getAllPlants().size();
        List<Order> orders = orderService.getAllOrders();
        long totalOrders = orders.size();

        double totalSales = orders.stream()
                .filter(o -> "Delivered".equalsIgnoreCase(o.getStatus()))
                .mapToDouble(o -> o.getTotal() != null ? o.getTotal() : 0.0)
                .sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalPlants", totalPlants);
        stats.put("totalOrders", totalOrders);
        stats.put("totalSales", totalSales);
        stats.put("deliveredSales", totalSales);
        return ResponseEntity.ok(stats);
    }

    @PutMapping("/users/{userId}/approve")
    public ResponseEntity<?> approveUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setApproved(true);
        userRepository.save(user);
        emailService.sendRegistrationApprovalEmail(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User approved");
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{userId}/reject")
    public ResponseEntity<?> rejectUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(false);
        userRepository.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User disabled");
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        userRepository.deleteById(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User deleted");
        return ResponseEntity.ok(response);
    }
}
