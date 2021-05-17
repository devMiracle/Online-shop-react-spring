package org.miracle.java.springboot.brokershop.controllers;


import org.miracle.java.springboot.brokershop.AuthService;
import org.miracle.java.springboot.brokershop.models.RoleModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Все данные десериализуются из JSON в Java и при return из Java в JSON
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/roles")
    public List<RoleModel> getRoles () {
        return authService.getRoles();
    }
}
