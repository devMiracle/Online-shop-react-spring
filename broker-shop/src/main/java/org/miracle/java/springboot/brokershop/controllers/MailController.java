package org.miracle.java.springboot.brokershop.controllers;

//import com.paypal.api.payments.Links;
//import com.paypal.api.payments.Payment;
//import com.paypal.base.rest.PayPalRESTException;
import org.miracle.java.springboot.brokershop.models.CartItem;
import org.miracle.java.springboot.brokershop.models.CartModel;
import org.miracle.java.springboot.brokershop.models.MailModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.services.CartService;
import org.miracle.java.springboot.brokershop.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;

@RestController
@RequestMapping("/api/mail")
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<ResponseModel> sendMailtoAdminAddress(
            @RequestBody MailModel mailModel
    ) throws MessagingException, IOException {

        // вызов метода службы - увеличить число товара в корзине на 1
        ResponseModel response =
                mailService.sendMail(mailModel.getAddress(), mailModel.getMessage());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // внедрение объекта Authentication через аргумент метода
//    @GetMapping("")
//    @ResponseBody
//    public ResponseEntity<ResponseModel> getCartItems(Authentication authentication) {
//        return new ResponseEntity<>(
//                cartService.getCartItems(authentication),
//                HttpStatus.OK
//        );
//    }

//    @PostMapping("/{id}")
//    @ResponseBody
//    public ResponseEntity<ResponseModel> addCartItemCount(
//            @PathVariable("id") Long id,
//            @RequestBody CartModel cartModel,
//            Authentication authentication
//    ) {
//
//        // вызов метода службы - увеличить число товара в корзине на 1
//        ResponseModel response =
//                cartService.changeCartItemCount(
//                        cartModel,
//                        authentication
//                        , id
//                        , CartItem.Action.ADD
//                );
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

//    @PatchMapping("/{id}")
//    @ResponseBody
//    public ResponseEntity<ResponseModel> subtractCartItemCount(
//            @PathVariable("id") Long id,
//            Authentication authentication
//    ) {
//        ResponseModel response =
//                cartService.changeCartItemCount(
//                        authentication
//                        , id
//                        , CartItem.Action.SUB
//                );
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

//    @DeleteMapping(value = "/{id}")
//    @ResponseBody
//    public ResponseEntity<ResponseModel> deleteCartItem(
//            @PathVariable("id") Long id,
//            Authentication authentication
//    ) {
//        ResponseModel response =
//                cartService.changeCartItemCount(
//                        authentication
//                        , id
//                        , CartItem.Action.REM
//                );
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }




}

