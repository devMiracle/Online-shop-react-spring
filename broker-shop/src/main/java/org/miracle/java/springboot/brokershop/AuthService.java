package org.miracle.java.springboot.brokershop;

import org.miracle.java.springboot.brokershop.models.RoleModel;
import org.miracle.java.springboot.brokershop.repositories.RoleDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// Сервис, логика приложения, обстрагированная от источника данных и клиента.
@Service
public class AuthService {

    // @Autowired
    private final RoleDao roleDao;

    // Нельзя делать много внедрений зависимостей (1-2)
    public AuthService(RoleDao roleDao) {
        this.roleDao = roleDao;
    }


    public List<RoleModel> getRoles () {
        return roleDao.findAll()
                .stream().map(
                        roleEntity -> RoleModel.builder()
                                .id(roleEntity.getId())
                                .name(roleEntity.getName())
                                .build()
                ).collect(Collectors.toList());
    }
}
