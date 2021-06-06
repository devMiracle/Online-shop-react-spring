package org.miracle.java.springboot.brokershop.controllers;


import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.models.UserModel;
import org.miracle.java.springboot.brokershop.services.AuthService;
import org.miracle.java.springboot.brokershop.models.RoleModel;
import org.miracle.java.springboot.brokershop.services.interfaces.IAuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Locale;

// Все данные десериализуются из JSON в Java и при return из Java в JSON
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final IAuthService authService;

    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @Secured("ROLE_ADMIN")
    // Анотация GET-метод запроса
    @GetMapping("/admin/roles")
    public ResponseEntity<ResponseModel> getRoles () {
        ResponseModel responseModel = authService.getRoles();
        HttpStatus httpStatus;
        if (responseModel.getStatus().equals(ResponseModel.SUCCESS_STATUS)) {
            httpStatus = HttpStatus.OK;
        } else {
            httpStatus = HttpStatus.BAD_GATEWAY;
        }
        return new ResponseEntity<>(responseModel, httpStatus);
    }

    // Анотация POST-метод запроса
    @PostMapping("/roles")
    // анотация @RequestBody парсит из JSON в объект rolemodel
    public ResponseEntity<ResponseModel> createRoles (@RequestBody RoleModel rolemodel) {
        ResponseModel responseModel = authService.createRole(rolemodel);
        HttpStatus httpStatus;
        if (responseModel.getStatus().equals(ResponseModel.SUCCESS_STATUS)) {
            httpStatus = HttpStatus.CREATED;
        } else if (responseModel.getMessage().equals("This name is already taken")) {
            httpStatus = HttpStatus.CONFLICT;
        } else {
            httpStatus = HttpStatus.BAD_GATEWAY;
        }
        return new ResponseEntity<>(responseModel, httpStatus);
    }

    // /admin - для работы SpringSecurity
    @GetMapping("/admin/roles/{id}/users")
    public ResponseEntity<ResponseModel> getUsersByRole(@PathVariable Long id) {
        ResponseModel responseModel = authService.getRoleUsers(id);
        return new ResponseEntity<>(responseModel,
                (responseModel.getData() != null)
                    ? HttpStatus.OK
                    : HttpStatus.NOT_FOUND
                );
    }

    @PostMapping("/users")
    public ResponseEntity<ResponseModel> createUser(@RequestBody UserModel userModel) {
        ResponseModel responseModel = authService.createUser(userModel);
        return new ResponseEntity<>(responseModel,
                (responseModel.getMessage().toLowerCase().contains("created"))
                    ? HttpStatus.CREATED
                    : responseModel.getMessage().contains("name")
                    ? HttpStatus.CONFLICT
                    : HttpStatus.BAD_GATEWAY
                );
    }

    @GetMapping("/user/signedout")
    public ResponseEntity<ResponseModel> signedOut(HttpSession httpSession) {
        return new ResponseEntity<>(authService.onSignOut(), HttpStatus.OK);
    }

    @GetMapping("/user/onerror")
    public ResponseEntity<ResponseModel> onError() {
        return new ResponseEntity<>(authService.onError(), HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(value = "/user/check")
    // @ResponseBody
    /** @param authentication объект стандартного типа с данными учетной записи
     * пользователя теущего http-сеанса, если ранее произошла успешная аутентификация,
     * получается внедрением зависимости через аргумент метода */
    public ResponseEntity<ResponseModel> checkUser(Authentication authentication) {
        ResponseModel responseModel = authService.check(authentication);
        return new ResponseEntity<>(
                responseModel,
                (responseModel.getData() != null)
                        ? HttpStatus.OK
                        : HttpStatus.UNAUTHORIZED
        );
    }

    // Анотация подсказывает, что в теле запроса должны быть данные, которые нужно добавить в БД к уже существующим. (Изменить часть информации)
    @PatchMapping(value = "/users/{id}/makeadmin")
    //@PutMapping - используется, когда нужно добавить новые данные в БД
    public ResponseEntity<ResponseModel> makeUserAdmin(/*Извлекается часть адресной строки*/@PathVariable Long id) throws Exception {
        return new ResponseEntity<>(authService.makeUserAdmin(id), HttpStatus.OK); // TODO: makeUserAdmin может вернуть неудачу, доработать все варианты статуса ответа
    }

    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<ResponseModel> deleteUser(@PathVariable Long id) {
        return new ResponseEntity<>(authService.deleteUser(id), HttpStatus.NO_CONTENT);
    }


}
