package org.miracle.java.springboot.brokershop.repositories;

import org.miracle.java.springboot.brokershop.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDao extends JpaRepository<Category, Long> {

}
