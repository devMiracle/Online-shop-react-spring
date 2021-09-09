package org.miracle.java.springboot.brokershop.services;

import org.miracle.java.springboot.brokershop.models.Cart;
import org.miracle.java.springboot.brokershop.models.CartModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.repositories.CartMongoDao;
import org.miracle.java.springboot.brokershop.repositories.ProductDao;
import org.miracle.java.springboot.brokershop.services.interfaces.IMailService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.miracle.java.springboot.brokershop.repositories.UserDao;



import javax.mail.*;
//import javax.mail.internet.AddressException;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Properties;




import javax.mail.internet.*;

@Service
public class MailService implements IMailService {

    private final ProductDao productDao;
    private final UserDao userDao;
    private final CartMongoDao cartMongoDao;

    public MailService(ProductDao productDao, UserDao userDao, CartMongoDao cartMongoDao) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.cartMongoDao = cartMongoDao;
    }



    @Override
    public ResponseModel sendMail(Authentication authentication) throws AddressException, MessagingException, IOException {
        String message = "";
        String address = "test.tortodel@gmail.com";
        Integer sum = 0;
        // есть ли текущий аутентифицированный пользователь
        if (authentication != null && authentication.isAuthenticated()) {
            // из mysql db находим по имени учетную запись пользователя,
            // из нее - идентификатор
            Long userId = userDao.findUserByName(authentication.getName()).getId();
            // из mongo db по идентификатору - объект корзины пользователя
            Cart cart = cartMongoDao.findCartByUserId(userId);
            if(userId == null) {
                System.out.println("userId == null");
            }
            if(cart == null) {
                System.out.println("cart ==null");
            }


            for (CartModel item : cart.getCartModels()) {
                message += "Ид товара: " + item.getProductId() + "\n";
                message += "Вес: " + item.getWeight() + "\n";
                message += "Наполнение: " + item.getFilling() + "\n";
                message += "Фигурка: " + item.getSculpture() + "\n";
                message += "Надпись на торте: " + item.getTitle() + "\n";
                message += "Пожелание к товару: " + item.getDescription() + "\n";
                message += "Телефон: " + item.getPhoneNumber() + "\n";
                message += "Количество: " + item.getQuantity() + "\n";
                message += "Сумма: " + item.getPrice() + "\n";
                message += "----------\n";
                sum += item.getPrice();
            }
            message += "Итого: " + sum + "\n";
//            if (cart == null) {
//                cart = new Cart();
//                cart.setUserId(userId);
//            }

            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.port", "587");

            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("tortodel.store@gmail.com", "tort0629Qq");
                }
            });
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress("tortodel.store@gmail.com", false));

            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(address));
            msg.setSubject("Новый Заказ");

            msg.setContent(message, "text/plain; charset=utf-8");
            msg.setSentDate(new Date());

//        MimeBodyPart messageBodyPart = new MimeBodyPart();
//        messageBodyPart.setContent("Tutorials point email", "text/html");

//        Multipart multipart = new MimeMultipart();
//        multipart.addBodyPart(messageBodyPart);
//        MimeBodyPart attachPart = new MimeBodyPart();
//
//        attachPart.attachFile("/var/tmp/image19.png");
//        multipart.addBodyPart(attachPart);
//        msg.setContent(multipart);

            Transport.send(msg);

        } else {
            System.out.println("not auth");
        }




        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message("Message has been send")
//                .data()
                .build();
    }
}


//    @Override
//    public ResponseModel sendMail(String address, String message) {
//
//        return ResponseModel.builder()
//                .status(ResponseModel.SUCCESS_STATUS)
//                .message("Message has been send")
////                .data()
//                .build();
//    }
//}
