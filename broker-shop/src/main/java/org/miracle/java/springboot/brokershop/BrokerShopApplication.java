package org.miracle.java.springboot.brokershop;

import org.miracle.java.springboot.brokershop.entities.Role;
import org.miracle.java.springboot.brokershop.entities.User;
import org.miracle.java.springboot.brokershop.repositories.RoleDao;
import org.miracle.java.springboot.brokershop.repositories.UserDao;
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
	public CommandLineRunner initData(RoleDao roleDao, UserDao userDao) {
		return  args -> {
			roleDao.save((Role.builder().name("ROLE_ADMIN").build()));
			roleDao.save((Role.builder().name("ROLE_USER").build()));

			Role adminRole = roleDao.findRoleByName("ROLE_ADMIN");
			Role userRole = roleDao.findRoleByName("ROLE_USER");

			userDao.save(
					User.builder()
							.name("admin")
							.password("Passwo0rd0")
							.role(adminRole)
							.build()
			);
			userDao.save(
					User.builder()
							.name("one")
							.password("Passwo0rd1")
							.role(userRole)
							.build()
			);
			userDao.save(
					User.builder()
							.name("two")
							.password("Passwo0rd2")
							.role(userRole)
							.build()
			);
			userDao.save(
					User.builder()
							.name("three")
							.password("Passwo0rd3")
							.role(userRole)
							.build()
			);

		};
	}



}