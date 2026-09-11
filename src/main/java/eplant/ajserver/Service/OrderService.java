package eplant.ajserver.Service;

import eplant.ajserver.Model.CartItem;
import eplant.ajserver.Model.Order;
import eplant.ajserver.Model.Plant;
import eplant.ajserver.Repository.CartItemRepository;
import eplant.ajserver.Repository.OrderRepository;
import eplant.ajserver.Repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final PlantRepository plantRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, CartItemRepository cartItemRepository, PlantRepository plantRepository) {
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
        this.plantRepository = plantRepository;
    }

    public Order placeOrder(Long userId, List<CartItem> cartItems) {
        double total = calculateTotal(cartItems);

        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("Pending");
        order.setTotal(total);
        order.setDate(LocalDateTime.now().toString());
        order.setItemsJson(cartItemsToJson(cartItems));

        for (CartItem item : cartItems) {
            Plant plant = plantRepository.findById(item.getPlantId())
                    .orElseThrow(() -> new RuntimeException("Plant not found"));
            if (plant.getStock() < item.getQty()) {
                throw new RuntimeException("Insufficient stock for " + plant.getName());
            }
            plant.setStock(plant.getStock() - item.getQty());
            plantRepository.save(plant);
        }

        cartItemRepository.deleteByUserId(userId);

        return orderRepository.save(order);
    }

    private String cartItemsToJson(List<CartItem> items) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < items.size(); i++) {
            CartItem item = items.get(i);
            sb.append("{\"plantId\":").append(item.getPlantId())
              .append(",\"qty\":").append(item.getQty())
              .append(",\"userId\":").append(item.getUserId())
              .append("}");
            if (i < items.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    private double calculateTotal(List<CartItem> items) {
        double subtotal = 0;
        for (CartItem item : items) {
            Plant plant = plantRepository.findById(item.getPlantId()).orElse(null);
            if (plant != null) {
                subtotal += plant.getPrice() * item.getQty();
            }
        }
        double deliveryFee = subtotal >= 5000 ? 0 : 200;
        return subtotal + deliveryFee;
    }
}
