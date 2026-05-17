package com.sgbd.sportshop.service;

import com.sgbd.sportshop.dto.OrderDetailsResponse;
import com.sgbd.sportshop.dto.OrderRequest;
import com.sgbd.sportshop.dto.OrderResponse;
import com.sgbd.sportshop.dto.OrderStatusUpdateRequest;
import com.sgbd.sportshop.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public OrderResponse placeOrder(OrderRequest request) {
        orderRepository.placeOrder(request);

        return new OrderResponse("Comanda a fost plasata cu succes.");
    }

    public List<OrderDetailsResponse> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<OrderDetailsResponse> getOrdersByUserId(Integer userId) {
        return orderRepository.findByUserId(userId);
    }

    public OrderResponse updateOrderStatus(Integer orderId, OrderStatusUpdateRequest request) {
        if (request.status() == null || request.status().isBlank()) {
            throw new IllegalArgumentException("Statusul este obligatoriu.");
        }

        String newStatus = request.status().toUpperCase();

        Set<String> allowedStatuses = Set.of("NOUA", "CONFIRMATA", "ANULATA", "FINALIZATA");

        if (!allowedStatuses.contains(newStatus)) {
            throw new IllegalArgumentException("Status invalid.");
        }

        String currentStatus = orderRepository.findStatusById(orderId);

        if ("FINALIZATA".equals(currentStatus) || "ANULATA".equals(currentStatus)) {
            throw new IllegalArgumentException("Statusul unei comenzi finalizate sau anulate nu mai poate fi modificat.");
        }

        if ("NOUA".equals(currentStatus)
                && !("CONFIRMATA".equals(newStatus) || "ANULATA".equals(newStatus))) {
            throw new IllegalArgumentException("O comanda noua poate fi doar confirmata sau anulata.");
        }

        if ("CONFIRMATA".equals(currentStatus)
                && !"FINALIZATA".equals(newStatus)) {
            throw new IllegalArgumentException("O comanda confirmata poate fi doar finalizata.");
        }

        orderRepository.updateStatus(orderId, newStatus);

        return new OrderResponse("Statusul comenzii a fost actualizat.");
    }
}

