package org.miracle.java.springboot.brokershop.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
// Насторойка GlobalMethodSecurityConfiguration
@EnableGlobalMethodSecurity(
        // Жизненый циклы объектов бинов
        prePostEnabled = true,
        // Активировать защиту методов способов спринг секьюрити
        securedEnabled = true,
        // Дополнительные настройки безопасности методов из спецификации Jakarta
        jsr250Enabled = true)
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {
}
