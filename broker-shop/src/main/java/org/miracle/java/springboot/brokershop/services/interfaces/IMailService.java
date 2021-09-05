package org.miracle.java.springboot.brokershop.services.interfaces;

import org.miracle.java.springboot.brokershop.models.CategoryModel;
import org.miracle.java.springboot.brokershop.models.MailItemModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.springframework.security.core.Authentication;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import java.io.IOException;

public interface IMailService {
    ResponseModel sendMail(Authentication authentication) throws AddressException, MessagingException, IOException;
}
