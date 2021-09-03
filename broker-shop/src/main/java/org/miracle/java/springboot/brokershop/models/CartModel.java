package org.miracle.java.springboot.brokershop.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CartModel {
    public Long id;
    public Long productId;
    public Double weight;
    public String filling;
    public Boolean sculpture;
    public String title;
    public String description;
    public BigDecimal price;
    public Integer quantity;
}
