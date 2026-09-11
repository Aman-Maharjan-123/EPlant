package eplant.ajserver.Service;

import eplant.ajserver.Model.CartItem;
import eplant.ajserver.Model.Plant;
import eplant.ajserver.Repository.CartItemRepository;
import eplant.ajserver.Repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final PlantRepository plantRepository;

    @Autowired
    public CartService(CartItemRepository cartItemRepository, PlantRepository plantRepository) {
        this.cartItemRepository = cartItemRepository;
        this.plantRepository = plantRepository;
    }

    public List<CartItem> getCart(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public CartItem addToCart(Long userId, Long plantId, Integer qty) {
        Plant plant = plantRepository.findById(plantId)
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        if (plant.getStock() < qty) {
            throw new RuntimeException("Insufficient stock");
        }

        Optional<CartItem> existing = cartItemRepository.findByUserId(userId)
                .stream()
                .filter(item -> item.getPlantId().equals(plantId))
                .findFirst();

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQty(item.getQty() + qty);
            return cartItemRepository.save(item);
        } else {
            CartItem item = new CartItem();
            item.setUserId(userId);
            item.setPlantId(plantId);
            item.setQty(qty);
            return cartItemRepository.save(item);
        }
    }

    public CartItem updateCartItemQty(Long userId, Long plantId, Integer qty) {
        if (qty <= 0) {
            cartItemRepository.findByUserId(userId).stream()
                    .filter(item -> item.getPlantId().equals(plantId))
                    .findFirst()
                    .ifPresent(cartItemRepository::delete);
            return null;
        }

        Plant plant = plantRepository.findById(plantId)
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        if (plant.getStock() < qty) {
            throw new RuntimeException("Insufficient stock");
        }

        CartItem item = cartItemRepository.findByUserId(userId).stream()
                .filter(ci -> ci.getPlantId().equals(plantId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not in cart"));

        item.setQty(qty);
        return cartItemRepository.save(item);
    }

    public void removeFromCart(Long userId, Long plantId) {
        cartItemRepository.findByUserId(userId).stream()
                .filter(item -> item.getPlantId().equals(plantId))
                .findFirst()
                .ifPresent(cartItemRepository::delete);
    }

    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    public int getCartCount(Long userId) {
        return cartItemRepository.findByUserId(userId).stream()
                .mapToInt(CartItem::getQty)
                .sum();
    }

    public double getCartSubtotal(Long userId) {
        double subtotal = 0;
        for (CartItem item : cartItemRepository.findByUserId(userId)) {
            Plant plant = plantRepository.findById(item.getPlantId()).orElse(null);
            if (plant != null) {
                subtotal += plant.getPrice() * item.getQty();
            }
        }
        return subtotal;
    }
}
