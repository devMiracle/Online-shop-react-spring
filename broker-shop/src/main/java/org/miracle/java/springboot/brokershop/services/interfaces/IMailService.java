package org.miracle.java.springboot.brokershop.services.interfaces;

import org.miracle.java.springboot.brokershop.models.CategoryModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import java.io.IOException;

public interface IMailService {
    ResponseModel sendMail(String address, String message) throws AddressException, MessagingException, IOException;
}
