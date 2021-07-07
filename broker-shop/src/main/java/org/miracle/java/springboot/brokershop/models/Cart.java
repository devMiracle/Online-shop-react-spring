package org.miracle.java.springboot.brokershop.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
// Область видимости бинов с настройкой
// Заставляет существовать бин от начала запроса до окончания ответа
// Нужно создать прокси по целевому классу
@Scope(scopeName = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
// Указывает, что это монго дб объект
@Document
public class Cart {
    @Id
    private String id;
    private Long userId;
    private List<CartItem> cartItems;
    public Cart() {
        cartItems = new ArrayList<>();
    }
}
