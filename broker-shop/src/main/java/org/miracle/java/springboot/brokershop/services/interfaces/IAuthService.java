package org.miracle.java.springboot.brokershop.services.interfaces;

import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.models.RoleModel;
import org.miracle.java.springboot.brokershop.models.UserModel;

import java.util.List;

public interface IAuthService {
    ResponseModel getRoles();
    ResponseModel createRole(RoleModel roleModel);
//    ResponseModel getUsers();
    ResponseModel getRoleUsers(Long roleId);
    ResponseModel createUser(UserModel userModel);
    ResponseModel deleteUser(Long userId);
    ResponseModel makeUserAdmin(Long userId);
}
