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
	@Value("${cake.image.1}")
	private String cakeImageString1;
	@Value("${cake.image.2}")
	private String cakeImageString2;
	@Value("${cake.image.3}")
	private String cakeImageString3;
	@Value("${cake.image.4}")
	private String cakeImageString4;
	@Value("${cake.image.5}")
	private String cakeImageString5;
	@Value("${cake.image.6}")
	private String cakeImageString6;
	@Value("${cake.image.7}")
	private String cakeImageString7;
	@Value("${cake.image.8}")
	private String cakeImageString8;
	@Value("${cake.image.9}")
	private String cakeImageString9;
	@Value("${cake.image.10}")
	private String cakeImageString10;




//	@Value("${cake.category.image.1}")
//	private String cake1CategoryImageString;
//	@Value("${cake.category.image.2}")
//	private String cake2CategoryImageString;
//	@Value("${cake.category.image.3}")
//	private String cake3CategoryImageString;
//	@Value("${cake.category.image.4}")
//	private String cake4CategoryImageString;
//	@Value("${cake.category.image.5}")
//	private String cake5CategoryImageString;
//	@Value("${cake.category.image.6}")
//	private String cake6CategoryImageString;



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
							.password(passwordEncoder.encode("admin"))
							.role(adminRole)
							.build()
			);
			userDao.save(
					User.builder()
							.name("one123")
							.password(passwordEncoder.encode("one123"))
							.role(userRole)
							.build()
			);
//			userDao.save(
//					User.builder()
//							.name("two")
//							.password(passwordEncoder.encode("Passwo0rd2"))
//							.role(userRole)
//							.build()
//			);
//			userDao.save(
//					User.builder()
//							.name("three")
//							.password(passwordEncoder.encode("Passwo0rd3"))
//							.role(userRole)
//							.build()
//			);
			Category category1 = Category.builder()
					.name("детские")
					//.image(cake1CategoryImageString)
					.build();
			Category category2 = Category.builder()
					.name("праздничные")
					//.image(cake2CategoryImageString)
					.build();
			Category category3 = Category.builder()
					.name("свадебные")
					//.image(cake3CategoryImageString)
					.build();
			Category category4 = Category.builder()
					.name("корпоратив")
					//.image(cake4CategoryImageString)
					.build();
			Category category5 = Category.builder()
					.name("тематические")
					//.image(cake5CategoryImageString)
					.build();
			Category category6 = Category.builder()
					.name("креативные")
					//.image(cake6CategoryImageString)
					.build();

			categoryDao.save(category1);
			categoryDao.save(category2);
			categoryDao.save(category3);
			categoryDao.save(category4);
			categoryDao.save(category5);
			categoryDao.save(category6);

			Product Product1 =
					Product.builder()
							.name("Торт бочка с черной икрой")
							.description("Торт выполнен в виде бочки является полностью съедобным. При покраске используются пищевые красители. Такой подарок задаст праздничное настроение и кучу положительных эмоций!")
							.price(new BigDecimal(223.92))
							.quantity(1)
							.category(category1)
							.image(cakeImageString1)
							.build();
			Product Product2 =
					Product.builder()
							.name("Торт мешок с деньгами")
							.description("Торт выполнен в виде мешка с деньгами является полностью съедобным. При покраске используются пищевые красители. Такой подарок задаст праздничное настроение и кучу положительных эмоций!")
							.price(new BigDecimal(250.50))
							.quantity(1)
							.category(category2)
							.image(cakeImageString2)
							.build();
			Product Product3 =
					Product.builder()
							.name("Торт бочка с красной икрой")
							.description("Торт выполнен в виде бочки с красной икрой  является полностью съедобным. При покраске используются пищевые красители. Такой подарок задаст праздничное настроение и кучу положительных эмоций!")
							.price(new BigDecimal(280.12))
							.quantity(1)
							.category(category3)
							.image(cakeImageString3)
							.build();
			Product Product4 =
					Product.builder()
							.name("Торт с пряниками Леди Баг")
							.description("Двухъярусный торт украшенный кремом, нижний ярус красного цвета, верхний белого. На верхушке торта имбирный пряник с рисунком героини мультфильма «Леди Баг». При желании Вы можете внести любые изменения в вид торта, добавить цифру, надпись, пожелания и так далее, а также выбрать одну из 12 начинок.")
							.price(new BigDecimal(280.50))
							.quantity(1)
							.category(category4)
							.image(cakeImageString4)
							.build();
			Product Product5 =
					Product.builder()
							.name("Двухъярусный торт")
							.description("Двухъярусный торт выполненный в бежево-золотых тонах, украшенный макарунами, короной и цифрой 2. В зависимости от возраста девочки можно изменить цифру на нужную, а также внести любые изменения в вид тортика. Выберите одну из доступных начинок, а если у вас есть пожелания по поводу ингредиентов, то обговорите это с менеджером по телефону. Если вам не подошел вариант на нашем сайте, прикрепите к форме заказа собственное фото.")
							.price(new BigDecimal(310.50))
							.quantity(1)
							.category(category5)
							.image(cakeImageString5)
							.build();
			Product Product6 =
					Product.builder()
							.name("Торт на 18 лет парню")
							.description("Вашему сыну или другу вот-вот исполниться 18 лет? Хотите по особенному отметить совершеннолетие? Тогда у нас для Вас замечательное предложение, в виде торта на заказ парню на 18 лет.")
							.price(new BigDecimal(240.50))
							.quantity(1)
							.category(category6)
							.image(cakeImageString6)
							.build();
			Product Product7 =
					Product.builder()
							.name("Торт на 20 лет парню")
							.description("Юбилей, всегда особенный день. И в этот день хочется порадовать именинника по особенному. Есть много способов сделать это, но обойтись без сладкого невозможно. Поэтому отличной идеей будет заказать торт на 20 лет парню в нашей кондитерской")
							.price(new BigDecimal(285.50))
							.quantity(1)
							.category(category1)
							.image(cakeImageString7)
							.build();
			Product Product8 =
					Product.builder()
							.name("Торт космос")
							.description("Кремовый торт с изображением космоса украшенный фигурками планет. Такой десерт будет оригинальным подарком для любого профессионального астронавта или маленького любителя космоса.")
							.price(new BigDecimal(220.50))
							.quantity(1)
							.category(category3)
							.image(cakeImageString8)
							.build();
			Product Product9 =
					Product.builder()
							.name("Торт Бочка Виски")
							.description("Оригинального вида торт будет самым приятным сюрпризом на Вашем празднике. Торт Бочка Виски не сможет оставить равнодушным никого. Он прекрасно подойдет в качестве подарка Вашему любимому мужчине или начальнику от коллектива, если он является ценителем крепких напитков. Торт сформирован из мастики с логотипом Jack Daniel’s – все его элементы съедобны, несмотря на внешнюю реалистичность.")
							.price(new BigDecimal(290.50))
							.quantity(1)
							.category(category4)
							.image(cakeImageString9)
							.build();
			Product Product10 =
					Product.builder()
							.name("Торт из книг-законов")
							.description("Оригинальный и необычный торт для корпоративной вечеринки или как подарок Вашему начальнику, юристу, адвокату. Прекрасно подойдет для академической сферы, образовательной, юридической. Состоит из нескольких ярусов-книг. Сформирован из сахарной мастики и крема, и настолько реалистичен, что книги действительно можно спутать с настоящими.")
							.price(new BigDecimal(310.50))
							.quantity(1)
							.category(category5)
							.image(cakeImageString10)
							.build();



			productDao.save(Product1);
			productDao.save(Product2);
			productDao.save(Product3);
			productDao.save(Product4);
			productDao.save(Product5);
			productDao.save(Product6);
			productDao.save(Product7);
			productDao.save(Product8);
			productDao.save(Product9);
			productDao.save(Product10);

			System.out.println("Server up!");

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