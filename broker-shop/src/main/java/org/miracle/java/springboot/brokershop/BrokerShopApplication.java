package org.miracle.java.springboot.brokershop;

import org.miracle.java.springboot.brokershop.entities.Category;
import org.miracle.java.springboot.brokershop.entities.Role;
import org.miracle.java.springboot.brokershop.entities.User;
import org.miracle.java.springboot.brokershop.repositories.CategoryDao;
import org.miracle.java.springboot.brokershop.repositories.RoleDao;
import org.miracle.java.springboot.brokershop.repositories.UserDao;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BrokerShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrokerShopApplication.class, args);
	}



	// Создаем бин для инициализации данных
	@Bean
	public CommandLineRunner initData(
			RoleDao roleDao,
			UserDao userDao,
			CategoryDao categoryDao,
			PasswordEncoder passwordEncoder
	) {
		return  args -> {
			roleDao.save((Role.builder().name("ROLE_ADMIN").build()));
			roleDao.save((Role.builder().name("ROLE_USER").build()));

			Role adminRole = roleDao.findRoleByName("ROLE_ADMIN");
			Role userRole = roleDao.findRoleByName("ROLE_USER");

			userDao.save(
					User.builder()
							.name("admin")
							.password(passwordEncoder.encode("Passwo0rd0"))
							.role(adminRole)
							.build()
			);
			userDao.save(
					User.builder()
							.name("one")
							.password(passwordEncoder.encode("Passwo0rd1"))
							.role(userRole)
							.build()
			);
			userDao.save(
					User.builder()
							.name("two")
							.password(passwordEncoder.encode("Passwo0rd2"))
							.role(userRole)
							.build()
			);
			userDao.save(
					User.builder()
							.name("three")
							.password(passwordEncoder.encode("Passwo0rd3"))
							.role(userRole)
							.build()
			);
			Category stockCategory = Category.builder().name("stock").build();
			Category cryptoCategory = Category.builder().name("crypto").build();
			Category eMoneyCategory = Category.builder().name("e-money").build();
			categoryDao.save(stockCategory);
			categoryDao.save(cryptoCategory);
			categoryDao.save(eMoneyCategory);

		};
	}



}