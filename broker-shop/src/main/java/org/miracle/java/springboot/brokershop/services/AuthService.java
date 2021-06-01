package org.miracle.java.springboot.brokershop.services;

import org.miracle.java.springboot.brokershop.entities.Role;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.models.RoleModel;
import org.miracle.java.springboot.brokershop.repositories.RoleDao;
import org.miracle.java.springboot.brokershop.services.interfaces.IAuthService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// Сервис, логика приложения, обстрагированная от источника данных и клиента.
@Service
public class AuthService implements IAuthService {

    // @Autowired
    private final RoleDao roleDao;

    // Нельзя делать много внедрений зависимостей (1-2)
    public AuthService(RoleDao roleDao) {
        this.roleDao = roleDao;
    }


    @Override
    public ResponseModel getRoles() {
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message("All the roles fetched successfully")
                .data(roleDao.findAll()
                        .stream().map(
                                roleEntity -> RoleModel.builder()
                                        .id(roleEntity.getId())
                                        .name(roleEntity.getName())
                                        .build()
                        ).collect(Collectors.toList()))
                .build();

    }

    @Override
    public ResponseModel createRole(RoleModel roleModel) {
        roleDao.save(Role.builder().name(roleModel.name).build());
        return ResponseModel.builder().status(ResponseModel.SUCCESS_STATUS)
                .message(String.format("Role %s created", roleModel.name))
                .build();
    }
}
