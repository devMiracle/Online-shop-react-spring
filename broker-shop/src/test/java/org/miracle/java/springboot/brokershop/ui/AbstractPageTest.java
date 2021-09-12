package org.miracle.java.springboot.brokershop.ui;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.miracle.java.springboot.brokershop.ui.pagefactory.IndexPage;
import org.openqa.selenium.WebDriver;
// Уточнение, какой тип драйвера будет использоваться в тестировании
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.TimeUnit;

public abstract class AbstractPageTest {

    protected static WebDriver driver;
    protected IndexPage indexPage;

    @BeforeAll
    private static void setupAll() {
        // обращение к JVM: установить значение свойства webdriver.gecko.driver
        // в driver/geckodriver
        System.setProperty(
                "webdriver.chrome.driver",
                "driver/chromedriver.exe"
        );
        System.setProperty("webdriver.chrome.whitelistedIps", "46.160.84.84");
    }

    @BeforeEach
    private void setupEach() {
        // запускаем браузер
        driver = new ChromeDriver();
        // устанавливаем глобальную настройку ожидания:
        // всегда после выполнения действий с представлением ожидать 5 секунд,
        // и если последствия действий еще не проявились на странице - ждать дополнительно
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        // развернуть окно браузера на весь экран
        driver.manage().window().maximize();
        // выполнить http-get запрос в браузере по указанному адресу
        driver.get("http://46.160.84.84:3000/shop/");
        indexPage = new IndexPage(driver);
    }

    @AfterEach
    private void disposeEach() {
        // после окончания каждого тест-кейса закрывать браузер
        driver.quit();
    }
}
