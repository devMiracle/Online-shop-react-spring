package org.miracle.java.springboot.brokershop.ui;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.miracle.java.springboot.brokershop.BrokerShopApplication;
import org.miracle.java.springboot.brokershop.ui.pagefactory.SignInPage;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT,
        classes = BrokerShopApplication.class
)
public class SignInPageTest extends AbstractPageTest {

    private SignInPage signInPage;

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
    public void performSignInWithCorrectAdminUserNameAndPassword() throws InterruptedException {
        signInPage.loginWithValidCredentials("admin", "admin");
        Thread.sleep(3000);
        assertEquals("http://46.160.84.84:3000/shop/", driver.getCurrentUrl());
        String logOutButtonText = indexPage.getLogOutButtonText();
        assertNotNull(logOutButtonText);
        assertEquals("ВЫЙТИ (ADMIN)", logOutButtonText);
    }

    @Test
    @Order(2)
    public void failSignInWithWrongUserNameAndCorrectAdminPassword() {
        //signInPage =
        signInPage.loginWithInvalidCredentials("wrong", "AdminPassword1");
        String logOutButtonText = indexPage.getLogOutButtonText();
        // assertEquals("", logOutButtonText);
        assertNull(logOutButtonText);
        String errorText = signInPage.getErrorText();
        assertNotNull(errorText);
        assertEquals("Login or password is wrong", errorText);
    }
}
