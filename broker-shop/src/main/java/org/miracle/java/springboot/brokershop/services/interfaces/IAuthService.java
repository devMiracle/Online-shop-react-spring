package org.miracle.java.springboot.brokershop.services.interfaces;

import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.models.RoleModel;
import org.miracle.java.springboot.brokershop.models.UserModel;
import org.miracle.java.springboot.brokershop.services.AuthService;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IAuthService {
    ResponseModel getRoles();
    ResponseModel createRole(RoleModel roleModel);
    // ResponseModel getUsers();
    ResponseModel getRoleUsers(Long roleId);
    ResponseModel createUser(UserModel userModel);
    ResponseModel deleteUser(Long userId);
    ResponseModel makeUserAdmin(Long userId);
    ResponseModel check(Authentication authentication);
    ResponseModel onSignOut();
    ResponseModel onError();
}
