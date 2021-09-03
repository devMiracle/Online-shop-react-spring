package org.miracle.java.springboot.brokershop.services;

import org.eclipse.jetty.util.ajax.JSON;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.services.interfaces.IMailService;
import org.springframework.stereotype.Service;

import javax.mail.*;
//import javax.mail.internet.AddressException;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;




import javax.mail.internet.*;

@Service
public class MailService implements IMailService {

    @Override
    public ResponseModel sendMail(String address, String message) throws AddressException, MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("tortodel.store@gmail.com", "");
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
