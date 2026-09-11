package eplant.ajserver.Controller;

import eplant.ajserver.Model.Order;
import eplant.ajserver.Service.EmailService;
import eplant.ajserver.Service.OrderService;
import eplant.ajserver.Model.User;
import eplant.ajserver.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Autowired
    public OrderController(OrderService orderService, UserRepository userRepository, EmailService emailService) {
        this.orderService = orderService;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long orderId, @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            Order order = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
