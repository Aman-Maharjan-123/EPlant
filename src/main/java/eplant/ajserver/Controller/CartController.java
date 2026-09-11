package eplant.ajserver.Controller;

import eplant.ajserver.Model.CartItem;
import eplant.ajserver.Model.Order;
import eplant.ajserver.Service.CartService;
import eplant.ajserver.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    private final CartService cartService;
    private final OrderService orderService;

    @Autowired
    public CartController(CartService cartService, OrderService orderService) {
        this.cartService = cartService;
        this.orderService = orderService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody Map<String, Object> request) {
        try {
            Long plantId = Long.parseLong(request.get("plantId").toString());
            Integer qty = Integer.parseInt(request.get("qty").toString());
            return ResponseEntity.ok(cartService.addToCart(userId, plantId, qty));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<?> updateCartItem(@PathVariable Long userId, @RequestBody Map<String, Object> request) {
        try {
            Long plantId = Long.parseLong(request.get("plantId").toString());
            Integer qty = Integer.parseInt(request.get("qty").toString());
            CartItem updated = cartService.updateCartItemQty(userId, plantId, qty);
            if (updated == null) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{userId}/remove/{plantId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long userId, @PathVariable Long plantId) {
        cartService.removeFromCart(userId, plantId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}/count")
    public ResponseEntity<Integer> getCartCount(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartCount(userId));
    }

    @GetMapping("/{userId}/subtotal")
    public ResponseEntity<Double> getCartSubtotal(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartSubtotal(userId));
    }

    @PostMapping("/{userId}/checkout")
    public ResponseEntity<?> checkout(@PathVariable Long userId) {
        try {
            List<CartItem> cartItems = cartService.getCart(userId);
            if (cartItems.isEmpty()) {
                return ResponseEntity.badRequest().body("Cart is empty");
            }
            Order order = orderService.placeOrder(userId, cartItems);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
