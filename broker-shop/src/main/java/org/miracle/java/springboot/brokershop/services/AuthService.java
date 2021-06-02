package org.miracle.java.springboot.brokershop.services;

import org.miracle.java.springboot.brokershop.entities.Role;
import org.miracle.java.springboot.brokershop.entities.User;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.models.RoleModel;
import org.miracle.java.springboot.brokershop.models.UserModel;
import org.miracle.java.springboot.brokershop.repositories.RoleDao;
import org.miracle.java.springboot.brokershop.repositories.UserDao;
import org.miracle.java.springboot.brokershop.services.interfaces.IAuthService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// Сервис, логика приложения, обстрагированная от источника данных и клиента.
@Service
public class AuthService implements IAuthService {

    // @Autowired
    private final RoleDao roleDao;
    private final UserDao userDao;

    // Нельзя делать много внедрений зависимостей (1-2)
    public AuthService(RoleDao roleDao, UserDao userDao) {
        this.roleDao = roleDao;
        this.userDao = userDao;
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

    @Override
    @Transactional
    public ResponseModel getRoleUsers(Long roleId) {
        Optional<Role> roleOptional = roleDao.findById(roleId);
        if (roleOptional.isPresent()) {
            Role role = roleOptional.get();
            List<UserModel> userModels =
                    role.getUsers().stream().map(user ->
                            UserModel.builder()
                                    .name(user.getName())
                                    .roleId(user.getRole().getId())
                                    .build()
                    )
                            .collect(Collectors.toList());
            return ResponseModel.builder()
                    .status(ResponseModel.SUCCESS_STATUS)
                    .message(String.format("List of %s Role Users Retrieved", role.getName()))
                    .data(userModels)
                    .build();
        } else {
            return ResponseModel.builder()
                    .status(ResponseModel.FAIL_STATUS)
                    .message(String.format("No Users: Role #%d Not Found", roleId))
                    .build();

        }
    }

    @Override
    public ResponseModel createUser(UserModel userModel) {
        User user =
                User.builder()
                        .name(userModel.getName().trim())
                        .password(userModel.getPassword())
                        .role(roleDao.findRoleByName("ROLE_USER"))
                        .build();
        userDao.save(user);
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message(String.format("User %s Created", user.getName()))
                .build();
    }

    @Override
    public ResponseModel deleteUser(Long userId) {
        // TODO: проверить роль администратора, и спросить, есть ли юзер в базе
        userDao.deleteById(userId);
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message(String.format("User #%d Deleted", userId))
                .build();
    }

    @Override
    public ResponseModel makeUserAdmin(Long userId) {
        // Находим роль по имени
        Role role = roleDao.findRoleByName("ROLE_ADMIN");
        // Находим пользователя по ID
        Optional<User> userOptional = userDao.findById(userId);
        // Если пользователь найден
        if (userOptional.isPresent()) {
            // Извлекаем пользователя
            User user = userOptional.get();
            // Назначаем роль
            user.setRole(role);
            // Пушим в базу (save - INSERT ЕСЛИ В БД НЕТ СТРОКИ С ЗАДАННЫМ ID \ UPDATE ЕСЛИ ID УЖЕ ЕСТЬ)
            userDao.save(user);
            // Возвращаем модель ответа
            return ResponseModel.builder()
                    .status(ResponseModel.SUCCESS_STATUS)
                    .message(String.format("Admin %s created successfully", user.getName()))
                    .build();
        // Иначе ответ с ошибкой
        } else {
            return ResponseModel.builder()
                    .status(ResponseModel.FAIL_STATUS)
                    .message(String.format("User #%d Not Found", userId))
                    .build();
        }
    }
}
