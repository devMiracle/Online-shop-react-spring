package org.miracle.java.springboot.brokershop.services;

import com.querydsl.core.types.dsl.BooleanExpression;
import org.miracle.java.springboot.brokershop.entities.Category;
import org.miracle.java.springboot.brokershop.entities.Product;
import org.miracle.java.springboot.brokershop.models.*;
import org.miracle.java.springboot.brokershop.repositories.CategoryDao;
import org.miracle.java.springboot.brokershop.repositories.ProductDao;
import org.miracle.java.springboot.brokershop.repositories.predicate.ProductPredicatesBuilder;
import org.miracle.java.springboot.brokershop.services.interfaces.IProductService;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService implements IProductService {

    private final ProductDao productDao;

    private final CategoryDao categoryDao;

    public ProductService(ProductDao productDao, CategoryDao categoryDao) {
        this.productDao = productDao;
        this.categoryDao = categoryDao;
    }

    public ResponseModel getLast6Product() {
        List<Product> products = productDao.findTop6ByOrderByIdDesc();
        List<ProductModel> productModels =
                products.stream()
                .map(product ->
                        ProductModel.builder()
                                .id(product.getId())
                                .title(product.getName())
                                .description(product.getDescription())
                                .quantity(product.getQuantity())
                                .price(product.getPrice())
                                .image(product.getImage())
                                // categoryId в заполнении не нуждается, потому что строкой ниже происходит передача целого объекта категории.
//                                .categoryId()
                                .category(
                                        CategoryModel.builder()
                                            .id(product.getCategory().getId())
                                            .name(product.getCategory().getName())
                                            .build()
                                )
                                .build()
                ).collect(Collectors.toList());
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message(String.format("Products fetch"))
                .data(productModels)
                .build();
    }

    @Override
    public ResponseModel create(ProductModel productModel) {
        Optional<Category> categoryOptional =
                categoryDao.findById(productModel.getCategoryId());
        if (categoryOptional.isPresent()) {
            Product product =
                    Product.builder()
                            .name(productModel.getTitle())
                            .description(productModel.getDescription())
                            .price(productModel.getPrice())
                            .quantity(productModel.getQuantity())
                            .image(productModel.getImage())
                            .category(categoryOptional.get())
                            .build();
            productDao.save(product);
            return ResponseModel.builder()
                    .status(ResponseModel.SUCCESS_STATUS)
                    .message(String.format("Product %s Created", product.getName()))
                    .build();
        } else {
            return ResponseModel.builder()
                    .status(ResponseModel.FAIL_STATUS)
                    .message(String.format("Category #%d Not Found", productModel.getCategoryId()))
                    .build();
        }
    }

    public ResponseModel getProductsPriceBounds() {
        Map<String, Integer> maxAndMin = new LinkedHashMap<>();
        maxAndMin.put("min", productDao.findMinimum().intValue());
        maxAndMin.put("max", productDao.findTop1ByOrderByPriceDesc().getPrice().intValue());
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .data(maxAndMin)
                .build();
    }

    public ResponseModel getProductsQuantityBounds() {
        Map<String, Integer> maxAndMin = new LinkedHashMap<>();
        maxAndMin.put("min", productDao.findTop1ByOrderByQuantityAsc().getQuantity());
        maxAndMin.put("max", productDao.findTop1ByOrderByQuantityDesc().getQuantity());
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .data(maxAndMin)
                .build();
    }


    @Override
    public ResponseModel update(ProductModel productModel) {
        Optional<Category> categoryOptional =
                categoryDao.findById(productModel.getCategoryId());
        if (categoryOptional.isPresent()) {
            Product product =
                Product.builder()
                        .id(productModel.getId())
                        .name(productModel.getTitle())
                        .description(productModel.getDescription())
                        .price(productModel.getPrice())
                        .quantity(productModel.getQuantity())
                        .image(productModel.getImage())
                        .category(categoryOptional.get())
                        .build();
            productDao.save(product);
            return ResponseModel.builder()
                    .status(ResponseModel.SUCCESS_STATUS)
                    .message(String.format("Product %s Updated", product.getName()))
                    .build();
        } else {
            return ResponseModel.builder()
                    .status(ResponseModel.FAIL_STATUS)
                    .message(String.format("Category #%d Not Found", productModel.getCategoryId()))
                    .build();
        }


    }

    @Override
    public ResponseModel getAll() {
        List<Product> products = productDao.findAll(Sort.by("id").descending());
        List<ProductModel> productModels =
                products.stream()
                .map(product ->
                        ProductModel.builder()
                                .id(product.getId())
                                .title(product.getName())
                                .description(product.getDescription())
                                .price(product.getPrice())
                                .quantity(product.getQuantity())
                                .image(product.getImage())
                                .category(
                                        CategoryModel.builder()
                                            .id(product.getCategory().getId())
                                            .name(product.getCategory().getName())
                                            .build()
                                )
                                .build()
                ).collect(Collectors.toList());
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .data(productModels)
                .build();
    }

    @Override
    public ResponseModel getOne(Long id) {
        Product product = productDao.findProductById (id);
        ProductModel productm = ProductModel.builder()
                .id(product.getId())
                .title(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .image(product.getImage())
                .category(
                        CategoryModel.builder()
                                .id(product.getCategory().getId())
                                .name(product.getCategory().getName())
                                .build()
                )
                .build();
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .data(productm)
                .build();
    }

    @Override
    public ResponseModel delete(Long id) {
        Optional<Product> productOptional = productDao.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            productDao.delete(product);
            return ResponseModel.builder()
                    .status(ResponseModel.SUCCESS_STATUS)
                    .message(String.format("Product %s Deleted", product.getName()))
                    .build();
        } else {
            return ResponseModel.builder()
                    .status(ResponseModel.FAIL_STATUS)
                    .message(String.format("Product #%d Not Found", id))
                    .build();
        }
    }

    @Override
    public ResponseModel getFiltered(ProductFilterModel filter) {
        List<Product> products =
                productDao.findByCategoryIds(
                        filter.categories,
                        Sort.by(filter.sortingDirection, filter.orderBy)
                );
        return getResponseModelFromEntities(products);
    }

    // поиск отфильтрованного и отсортированного списка товаров
    // на основе запросов query dsl
    @Override
    public ResponseModel search(ProductSearchModel searchModel) {
        List<Product> products = null;
        if (searchModel.searchString != null && !searchModel.searchString.isEmpty()) {
            ProductPredicatesBuilder builder = new ProductPredicatesBuilder();
            // разбиение значения http-параметра search
            // на отдельные выражения условий фильтрации
            Pattern pattern = Pattern.compile("([\\w]+?)(:|<|>|<:|>:)([\\w\\]\\[\\,]+?);");
            Matcher matcher = pattern.matcher(searchModel.searchString + ";");
            while (matcher.find()) {
                builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
            }
            BooleanExpression expression = builder.build();
            // выполнение sql-запроса к БД
            // с набором условий фильтрации
            // и с указанием имени поля и направления сортировки
            products =
                    (List<Product>) productDao.findAll(
                            expression,
                            Sort.by(
                                    searchModel.sortingDirection,
                                    searchModel.orderBy
                            )
                    );
        } else {
            products =
                    productDao.findAll(
                            Sort.by(
                                    searchModel.sortingDirection,
                                    searchModel.orderBy
                            )
                    );
        }
        return getResponseModelFromEntities(products);
    }

    private ResponseModel getResponseModelFromEntities(List<Product> products) {
        List<ProductModel> productModels =
                products.stream()
                        .map((p)->
                                ProductModel.builder()
                                        .id(p.getId())
                                        .title(p.getName())
                                        .description(p.getDescription())
                                        .price(p.getPrice())
                                        .quantity(p.getQuantity())
                                        .image(p.getImage())
                                        .category(
                                                CategoryModel.builder()
                                                        .id(p.getCategory().getId())
                                                        .name(p.getCategory().getName())
                                                        .build()
                                        )
                                        .build()
                        )
                        .collect(Collectors.toList());
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .data(productModels)
                .build();
    }

}
