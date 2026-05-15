package com.sgbd.sportshop.service;

import com.sgbd.sportshop.dto.OrderDetailsResponse;
import com.sgbd.sportshop.dto.OrderRequest;
import com.sgbd.sportshop.dto.OrderResponse;
import com.sgbd.sportshop.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
}