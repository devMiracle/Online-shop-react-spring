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
			Category stockCategory = Category.builder().name("stock").build();
			Category cryptoCategory = Category.builder().name("crypto").build();
			Category eMoneyCategory = Category.builder().name("e-money").build();
			categoryDao.save(stockCategory);
			categoryDao.save(cryptoCategory);
			categoryDao.save(eMoneyCategory);

			Product stockMSFTProduct =
					Product.builder()
							.name("MSFT")
							.description("Microsoft Stock")
							.price(new BigDecimal(203.92))
							.quantity(1000)
							.category(stockCategory)
							.image(msftImageString)
							.build();
			Product stockORCLProduct =
					Product.builder()
							.name("ORCL")
							.description("Oracle Stock")
							.price(new BigDecimal(55.82))
							.quantity(2000)
							.category(stockCategory)
							.image(orclImageString)
							.build();
			Product stockORCLProduct2 =
					Product.builder()
							.name("ORCL")
							.description("Oracle Stock")
							.price(new BigDecimal(56.12))
							.quantity(1000)
							.category(stockCategory)
							.image(orclImageString)
							.build();
			Product cryptoEthereumProduct =
					Product.builder()
							.name("ETH")
							.description("Ethereum Cryptocurrency")
							.price(new BigDecimal(232.48))
							.quantity(500)
							.category(cryptoCategory)
							.image(ethImageString)
							.build();
			productDao.save(stockMSFTProduct);
			productDao.save(stockORCLProduct);
			productDao.save(stockORCLProduct2);
			productDao.save(cryptoEthereumProduct);


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