package org.miracle.java.springboot.brokershop.controllers;

import org.miracle.java.springboot.brokershop.models.ProductFilterModel;
import org.miracle.java.springboot.brokershop.models.ProductModel;
import org.miracle.java.springboot.brokershop.models.ProductSearchModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService productService) {
        this.service = productService;
    }

    @GetMapping("/products")
    public ResponseEntity<ResponseModel> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @PostMapping("/products")
    public ResponseEntity<ResponseModel> create(@RequestBody ProductModel product) {
        return new ResponseEntity<>(service.create(product), HttpStatus. CREATED);
    }

    @GetMapping("/products/price-bounds")
    public ResponseEntity<ResponseModel> getProductsPriceBounds() {
        return new ResponseEntity<>(
                service.getProductsPriceBounds(),
                HttpStatus.OK
        );
    }

    @GetMapping("/products/quantity-bounds")
    public ResponseEntity<ResponseModel> getProductsQuantityBounds() {
        return new ResponseEntity<>(
                service.getProductsQuantityBounds(),
                HttpStatus.OK
        );
    }

    @PatchMapping(value = "/products/{id}")
    public ResponseEntity<ResponseModel> update(@PathVariable Long id, @RequestBody ProductModel product) {
        product.setId(id);
        return new ResponseEntity<>(service.update(product), HttpStatus.OK);
    }

    @DeleteMapping(value = "/products/{id}")
    public ResponseEntity<ResponseModel> delete(@PathVariable Long id) {
        ResponseModel responseModel = service.delete(id);
        return new ResponseEntity<>(responseModel, HttpStatus.NO_CONTENT);
    }

    // пользовательское правило для составления адресной строки:
    // :: разделяет пары "ключ-значение";
    // : разделяет ключи и значения
    @GetMapping("/categories/{categoryIds}/products::orderBy:{orderBy}::sortingDirection:{sortingDirection}")
    public ResponseEntity getByCategories(
            @PathVariable List<Long> categoryIds,
            @PathVariable String orderBy,
            @PathVariable Sort.Direction sortingDirection
    ) {
        return new ResponseEntity<>(
                service.getFiltered(
                        new ProductFilterModel(categoryIds, orderBy, sortingDirection)
                ),
                HttpStatus.OK
        );
    }


    // поиск списка товаров согласно query dsl-запроса из http-параметра search
    // и сортировка по значению поля orderBy в направлении sortingDirection,
    // заданным как часть начальной строки с произвольно выбранными разделителями:
    // "::" - между парами ключ-значение,
    // ":" - между каждым ключом и его значением
    @GetMapping("/products/filtered::orderBy:{orderBy}::sortingDirection:{sortingDirection}")
    public ResponseEntity<ResponseModel> search(
            @RequestParam(value = "search") String searchString,
            @PathVariable String orderBy,
            @PathVariable Sort.Direction sortingDirection
    ) {
        return new ResponseEntity<>(
                service.search(
                        new ProductSearchModel(searchString, orderBy, sortingDirection)
                ),
                HttpStatus.OK
        );
    }
}
