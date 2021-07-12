package org.miracle.java.springboot.brokershop;

import org.miracle.java.springboot.brokershop.entities.Category;
import org.miracle.java.springboot.brokershop.entities.Product;
import org.miracle.java.springboot.brokershop.entities.Role;
import org.miracle.java.springboot.brokershop.entities.User;
import org.miracle.java.springboot.brokershop.repositories.CategoryDao;
import org.miracle.java.springboot.brokershop.repositories.ProductDao;
import org.miracle.java.springboot.brokershop.repositories.RoleDao;
import org.miracle.java.springboot.brokershop.repositories.UserDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;


// import org.apache.catalina.connector.Connector;

import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;

import java.math.BigDecimal;

@SpringBootApplication
public class BrokerShopApplication {




	public static void main(String[] args) {
		SpringApplication.run(BrokerShopApplication.class, args);




	}
	@Value("${cake.image.one}")
	private String cake1ImageString;
	@Value("${cake.image.two}")
	private String cake2ImageString;
	@Value("${cake.image.three}")
	private String cake3ImageString;


	@Value("${tests.unit.strings.image-base64-msft}")
	private String msftImageString;

	@Value("${tests.unit.strings.image-base64-orcl}")
	private String orclImageString;

	@Value("${tests.unit.strings.image-base64-eth}")
	private String ethImageString;


	// Создаем бин для инициализации данных
	@Bean
	public CommandLineRunner initData(
			ProductDao productDao,
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
			Category category1 = Category.builder().name("детские").build();
			Category category2 = Category.builder().name("праздничные").build();
			Category category3 = Category.builder().name("свадебные").build();
			Category category4 = Category.builder().name("корпоратив").build();
			Category category5 = Category.builder().name("тематические").build();
			Category category6 = Category.builder().name("креативные").build();
			categoryDao.save(category1);
			categoryDao.save(category2);
			categoryDao.save(category3);
			categoryDao.save(category4);
			categoryDao.save(category5);
			categoryDao.save(category6);

			Product stockMSFTProduct =
					Product.builder()
							.name("Торт бочка с икрой")
							.description("Описание")
							.price(new BigDecimal(203.92))
							.quantity(2)
							.category(category1)
							.image(cake1ImageString)
							.build();
			Product stockORCLProduct =
					Product.builder()
							.name("Торт бочка с икрой")
							.description("Описание")
							.price(new BigDecimal(55.82))
							.quantity(4)
							.category(category2)
							.image(cake2ImageString)
							.build();
			Product stockORCLProduct2 =
					Product.builder()
							.name("Торт книга с деньгами")
							.description("Описание")
							.price(new BigDecimal(56.12))
							.quantity(5)
							.category(category3)
							.image(cake3ImageString)
							.build();
//			Product cryptoEthereumProduct =
//					Product.builder()
//							.name("ETH")
//							.description("Ethereum Cryptocurrency")
//							.price(new BigDecimal(232.48))
//							.quantity(500)
//							.category(cryptoCategory)
//							.image(ethImageString)
//							.build();
			productDao.save(stockMSFTProduct);
			productDao.save(stockORCLProduct);
			productDao.save(stockORCLProduct2);
			// productDao.save(cryptoEthereumProduct);


		};
	}

//	@Bean
//	public ConfigurableServletWebServerFactory webServerFactory() {
//		TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
//		factory.addConnectorCustomizers(new TomcatConnectorCustomizer() {
//			@Override
//			public void customize(Connector connector) {
//				connector.setProperty("relaxedQueryChars", "|{}[]");
//			}
//		});
//		return factory;
//	}

}