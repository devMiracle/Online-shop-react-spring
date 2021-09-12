package org.miracle.java.springboot.brokershop.ui.pagefactory;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class ItemPage extends AbstractPage {


    public ItemPage(WebDriver driver) {
        super(driver);
        System.out.println("ItemPage Loaded");
    }

    private By nextButton = By.cssSelector("#buttonNext");
    private By inputPhone = By.cssSelector("#outlined-secondary");
    private By buttonInCart = By.cssSelector("#buttonInCart");

    public void clickNext() {
        List<WebElement> element =
                driver.findElements(nextButton);
        element.get(0).click();
    }



    // симуляция ввода пользователем номера телефона в форму входа
    public ItemPage inputPhone(String phone) {
        driver.findElement(inputPhone).sendKeys(phone);
        return this;
    }

    public ItemPage clickButtonInCart() {
        driver.findElement(buttonInCart).click();
        return this;
    }

}
