package org.miracle.java.springboot.brokershop.security;


import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// Атотация говорит, что из этого класа нужно сделать бин с анологичным названиет, только с маленькой буквы
@Component
// Бин меняет логику спринг секьюрити
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
    // Логика отказа доступа к ресурсу
    @Override
    public void commence(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            AuthenticationException e
    ) throws IOException, ServletException {
        httpServletResponse.sendError(httpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}
