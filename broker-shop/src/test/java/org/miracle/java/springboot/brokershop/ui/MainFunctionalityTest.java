package org.miracle.java.springboot.brokershop.ui;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.miracle.java.springboot.brokershop.BrokerShopApplication;
import org.miracle.java.springboot.brokershop.ui.pagefactory.ItemPage;
import org.miracle.java.springboot.brokershop.ui.pagefactory.ItemsPage;
import org.miracle.java.springboot.brokershop.ui.pagefactory.SignInPage;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@ExtendWith(SpringExtension.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT,
        classes = BrokerShopApplication.class
)
public class MainFunctionalityTest extends AbstractPageTest {

    private SignInPage signInPage;
    private ItemsPage itemsPage;
    private ItemPage itemPage;


    @BeforeEach
    public void setupCase() throws InterruptedException {
        // перед каждым кейсом теста раздела входа
        // через модель каркаса страницы симулируем открытие раздела входа
        // как седствие клика по пункту навигационного меню
        signInPage = indexPage.clickSignIn();
        Thread.sleep(1000);
    }

    @Test
    @Order(1)
    public void mainFunctionalityTest() throws InterruptedException {
        signInPage.loginWithValidCredentials("admin", "admin");
        Thread.sleep(3000);
        assertEquals("http://46.160.84.84:3000/shop/", driver.getCurrentUrl());
        String buttonCategory = indexPage.getCategoryButton();
        assertNotNull(buttonCategory);
        assertEquals("ТОРТЫ", buttonCategory);
        Thread.sleep(1000);
        indexPage.clickCategoryButton();
        Thread.sleep(3000);
        itemsPage = indexPage.clickAllCakesButton();
        Thread.sleep(3000);
        itemPage = itemsPage.clickFirstElementItems();
        Thread.sleep(3000);
        itemPage.clickNext();
        Thread.sleep(3000);
        itemPage.clickNext();
        Thread.sleep(3000);
        itemPage.clickNext();
        Thread.sleep(3000);
        itemPage.inputPhone("+380975127077");
        Thread.sleep(3000);
        itemPage.clickNext();
        Thread.sleep(3000);
        itemPage.clickButtonInCart();
        Thread.sleep(3000);
        indexPage.clickCartButton();
        Thread.sleep(3000);
        indexPage.clickDoOrderButton();
        Thread.sleep(3000);
        String innerText = indexPage.getOrderInnerText();
        assertEquals("Корзина пуста", innerText);
    }

}
