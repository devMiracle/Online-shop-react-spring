package org.miracle.java.springboot.brokershop.ui;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.miracle.java.springboot.brokershop.BrokerShopApplication;
import org.miracle.java.springboot.brokershop.ui.pagefactory.SignUpPage;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT,
        classes = BrokerShopApplication.class
)
public class SignUpPageTest extends AbstractPageTest {

    private SignUpPage signUpPage;

    @BeforeEach
    public void setupCase() throws InterruptedException {
        // перед каждым кейсом теста раздела входа
        // через модель каркаса страницы симулируем открытие раздела входа
        // как седствие клика по пункту навигационного меню
        signUpPage = indexPage.clickSignUp();
        Thread.sleep(1000);
    }

    @Test
    @Order(1)
    public void givenCorrectUserNameAndPasswordWhenSubmitButtonClickThenRegisterAndLogin() throws InterruptedException {
        signUpPage.signUpWithValidCredentials("four", "UserPassword4");
        Thread.sleep(3000);
        assertEquals("http://46.160.84.84:3000/shop/", driver.getCurrentUrl());
        String logOutButtonText = indexPage.getLogOutButtonText();
        assertNotNull(logOutButtonText);
        assertEquals("ВЫЙТИ (FOUR)", logOutButtonText);
    }

    @Test
    @Order(2)
    public void givenUsedUserNameAndPasswordWhenSubmitButtonClickThenUniqueNameConstraintViolationShown() {
        signUpPage.signUpWithUniqueNameConstraintViolation("one123", "one123");
        String logOutButtonText = indexPage.getLogOutButtonText();
        // пункт меню для выхода из учетной записи не должен был появиться
        assertNull(logOutButtonText);
        String errorText = signUpPage.getErrorText();
        assertNotNull(errorText);
        assertEquals("This name is already taken", errorText);
    }
}
