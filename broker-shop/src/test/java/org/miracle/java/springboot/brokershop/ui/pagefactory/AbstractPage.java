package org.miracle.java.springboot.brokershop.ui.pagefactory;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public abstract class AbstractPage {

    protected WebDriver driver;


    public AbstractPage (WebDriver driver) {
        this.driver = driver;
        // Запуск контейнера внедрения зависимостей
        PageFactory.initElements(driver, this);
    }
}
