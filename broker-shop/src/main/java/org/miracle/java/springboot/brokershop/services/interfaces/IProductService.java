package org.miracle.java.springboot.brokershop.services.interfaces;

import jdk.jfr.consumer.RecordedStackTrace;
import org.miracle.java.springboot.brokershop.models.ProductFilterModel;
import org.miracle.java.springboot.brokershop.models.ProductModel;
import org.miracle.java.springboot.brokershop.models.ProductSearchModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;

public interface IProductService {
    ResponseModel create(ProductModel productModel);
    ResponseModel update(ProductModel productModel);
    ResponseModel getAll();
    ResponseModel delete(Long id);
    ResponseModel getFiltered(ProductFilterModel filter);
    ResponseModel search(ProductSearchModel productSearchModel);
}
