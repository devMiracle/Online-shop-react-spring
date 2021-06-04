package org.miracle.java.springboot.brokershop.controllers;


import org.miracle.java.springboot.brokershop.models.CategoryModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CategoryController {

private final CategoryService categoryService;


    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<ResponseModel> getAll() {
        return new ResponseEntity<>(categoryService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/categories")
    public ResponseEntity<ResponseModel> create(@RequestBody CategoryModel categoryModel) {
        return new ResponseEntity<>(categoryService.create(categoryModel), HttpStatus.CREATED);
    }

    @PatchMapping(value = "/categories/{id}")
    public ResponseEntity<ResponseModel> update(@PathVariable Long id, @RequestBody CategoryModel categoryModel) {
        categoryModel.setId(id);
        return new ResponseEntity<>(categoryService.update(categoryModel), HttpStatus.OK);
    }

    @DeleteMapping(value = "/categories/{id}")
    public ResponseEntity<ResponseModel> deleteCategory(@PathVariable Long id) {
        ResponseModel responseModel = categoryService.delete(id);
        return new ResponseEntity<>(responseModel, HttpStatus.OK);
    }





















}


