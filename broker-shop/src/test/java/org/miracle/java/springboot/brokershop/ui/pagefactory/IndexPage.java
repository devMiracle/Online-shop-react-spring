package org.miracle.java.springboot.brokershop.ui.pagefactory;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

/* PageObject для каркасной страницы index.html */
public class IndexPage extends AbstractPage {

    // пункт меню "Вход" находим на этапе выполнения конструктора
    // родительского класса
    @FindBy(css = "#root a[href*='signin']")
    private WebElement signInButton;
    @FindBy(css = "#root a[href*='signup']")
    private WebElement signUpButton;
    @FindBy(css = ".MuiButtonBase-root > div")
    private WebElement categoryButton;
    @FindBy(css = "div[class*=\"shoppingCart\"]")
    private WebElement cartButton;

    // для пункта "Выход" подготавливаем только селектор,
    // потому что он будет отображаться только после входа
    private By logOutButton = By.cssSelector(".MuiAppBar-root a[href*='auth:out']");

    private By categoryButtonSelector = By.cssSelector(".MuiButtonBase-root > div");

    private By allCakesButtonSelector = By.cssSelector("#allCakes");

    private By doOrderButton = By.cssSelector("button[class*=\"buttonBuy\"]");

    private By doOrderButtonTextSelector = By.cssSelector("#CartEmptyText");



    public String getOrderInnerText() {
        List<WebElement> element =
                driver.findElements(doOrderButtonTextSelector);
        return !element.isEmpty() ? element.get(0).getText() : null;
    }

    public void clickCartButton() {
        cartButton.click();
    }

    public void clickDoOrderButton() {
        List<WebElement> element =
                driver.findElements(doOrderButton);
        element.get(0).click();
    }


    public IndexPage(WebDriver driver) {
        super(driver);
        System.out.println("IndexPage Loaded");
    }

    public ItemsPage clickAllCakesButton() {
        List<WebElement> logOutButtonElement =
                driver.findElements(allCakesButtonSelector);
        logOutButtonElement.get(0).click();
        return new ItemsPage(driver);
    }

    public void clickCategoryButton() {
        categoryButton.click();
        //  new SignInPage(driver);
    }

    public SignInPage clickSignIn() {
        signInButton.click();
        return new SignInPage(driver);
    }

    // симуляция клика по пункту на панели навигации "Регистрация"
    public SignUpPage clickSignUp() {
        signUpButton.click();
        return new SignUpPage(driver);
    }

    public String getLogOutButtonText() {
        List<WebElement> logOutButtonElement =
                driver.findElements(logOutButton);
        return !logOutButtonElement.isEmpty() ? logOutButtonElement.get(0).getText() : null;
    }

    public String getCategoryButton() {
        List<WebElement> logOutButtonElement =
                driver.findElements(categoryButtonSelector);
        return !logOutButtonElement.isEmpty() ? logOutButtonElement.get(0).getText() : null;
    }
}
