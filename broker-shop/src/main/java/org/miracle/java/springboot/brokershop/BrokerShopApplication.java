package org.miracle.java.springboot.brokershop;

import org.miracle.java.springboot.brokershop.entities.Role;
import org.miracle.java.springboot.brokershop.repositories.RoleDao;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BrokerShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrokerShopApplication.class, args);
	}



	// Создаем бин для инициализации данных
	@Bean
	public CommandLineRunner initData(RoleDao roleDao) {
		return  args -> {
			roleDao.save((Role.builder().name("ROLE_ADMIN").build()));
			roleDao.save((Role.builder().name("ROLE_USER").build()));
			// Role adminRole = roleDao.findRoleByName("ROLE_ADMIN");
			// Role userRole = roleDao.findRoleByName("ROLE_USER");
		};
	}



}