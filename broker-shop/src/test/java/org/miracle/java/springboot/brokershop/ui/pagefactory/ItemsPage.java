package org.miracle.java.springboot.brokershop.ui.pagefactory;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

public class ItemsPage extends AbstractPage {

    @FindBy(css = ".MuiGrid-item > div > button[tabindex=\"0\"]")
    private WebElement firstElementItems;


    public ItemsPage(WebDriver driver) {
        super(driver);
        System.out.println("ItemsPage Loaded");
    }

    public ItemPage clickFirstElementItems() {
        firstElementItems.click();
        return new ItemPage(driver);
    }


}
