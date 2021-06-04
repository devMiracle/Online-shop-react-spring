package org.miracle.java.springboot.brokershop.services.interfaces;

import org.miracle.java.springboot.brokershop.models.CategoryModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;

public interface ICategoryService {
    ResponseModel create(CategoryModel categoryModel);
    ResponseModel getAll();
    ResponseModel delete(Long id);
    ResponseModel update(CategoryModel categoryModel);
}
