package org.miracle.java.springboot.brokershop.services.interfaces;

import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.models.RoleModel;

import java.util.List;

public interface IAuthService {
    ResponseModel getRoles();
    ResponseModel createRole(RoleModel roleModel);
}
