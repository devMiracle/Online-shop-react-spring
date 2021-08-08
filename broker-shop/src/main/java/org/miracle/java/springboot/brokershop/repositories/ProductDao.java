package org.miracle.java.springboot.brokershop.repositories;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.miracle.java.springboot.brokershop.entities.Category;
import org.miracle.java.springboot.brokershop.entities.QProduct;
import org.miracle.java.springboot.brokershop.entities.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductDao extends JpaRepository<Product, Long>,
        QuerydslPredicateExecutor<Product>, QuerydslBinderCustomizer<QProduct> {



    @Query( "SELECT p FROM Product p WHERE p.category.id IN :ids" )
    List<Product> findByCategoryIds(
            @Param("ids") List<Long> categoryIds,
            Sort sort
    );

    @Query( "SELECT MIN(p.price) FROM Product p" )
    BigDecimal findMinimum ();

    Product findTop1ByOrderByPriceDesc ();

    Product findTop1ByOrderByQuantityDesc ();

    Product findTop1ByOrderByQuantityAsc ();

    Integer countProductsByCategory (Category category);

    Product findProductById (Long id);

    // добавление поддержки запросов query dsl
    // (предварительно нужно сгенерировать тип QProduct командой
    // mvn apt:process или запустить lifecycle task package)
    @Override
    default public void customize(
            QuerydslBindings bindings, QProduct root) {
        bindings.bind(String.class)
                .first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
        bindings.excluding(root.image);
    }

}
