package org.miracle.java.springboot.brokershop.controllers;

//import com.paypal.api.payments.Links;
//import com.paypal.api.payments.Payment;
//import com.paypal.base.rest.PayPalRESTException;
import org.miracle.java.springboot.brokershop.models.CartItem;
import org.miracle.java.springboot.brokershop.models.CartModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.services.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // внедрение объекта Authentication через аргумент метода
    @GetMapping("")
    @ResponseBody
    public ResponseEntity<ResponseModel> getCartItems(Authentication authentication) {
        return new ResponseEntity<>(
                cartService.getCartItems(authentication),
                HttpStatus.OK
        );
    }

    @PostMapping("/{id}")
    @ResponseBody
    public ResponseEntity<ResponseModel> addCartItemCount(
            @PathVariable("id") Long id,
            @RequestBody CartModel cartModel,
            Authentication authentication
    ) {
//        System.out.println("data Id: " + cartModel.getId());
        System.out.println("data ProductId: " + cartModel.getProductId());
        System.out.println("data Weight: " + cartModel.getWeight());
        System.out.println("data Filling: " + cartModel.getFilling());
        System.out.println("data Sculpture: " + cartModel.getSculpture());
        System.out.println("data Title: " + cartModel.getTitle());
        System.out.println("data Description: " + cartModel.getDescription());
        System.out.println("data Price: " + cartModel.getPrice());
//        System.out.println("data Quantity: " + cartModel.getQuantity());
        System.out.println("data phoneNumber: " + cartModel.getPhoneNumber());
        // вызов метода службы - увеличить число товара в корзине на 1
        ResponseModel response =
                cartService.changeCartItemCount(
                        cartModel,
                        authentication
                        , id
                        , CartItem.Action.ADD
                );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @ResponseBody
    public ResponseEntity<ResponseModel> subtractCartItemCount(
            @PathVariable("id") Long id,
            Authentication authentication
    ) {
        ResponseModel response =
                cartService.changeCartItemCount(
                        authentication
                        , id
                        , CartItem.Action.SUB
                );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<ResponseModel> deleteCartItem(
            @PathVariable("id") Long id,
            Authentication authentication
                ) {
        ResponseModel response =
                cartService.changeCartItemCount(
                        authentication
                        , id
                        , CartItem.Action.REM
                );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/")
    @ResponseBody
    public ResponseEntity<ResponseModel> deleteCartItem(
            Authentication authentication
    ) {
        ResponseModel response =
                cartService.clearCartItems(authentication);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    // этот метод нужно вызвать с фронтенда синхронно
//    @GetMapping("/pay")
//    public String payment(Authentication authentication, PaymentService paymentService) throws PayPalRESTException {
//        Cart cart = cartService.getCart(authentication);
//        Payment payment =
//                paymentService.createPayment(
//                        cart,
//                        "USD",
//                        "paypal",
//                        "sale",
//                        "testing",
//                        "http://localhost:8080/shop/api/cart/pay/cancel",
//                        "http://localhost:8080/shop/api/cart/pay/success"
//                );
//        for(Links link : payment.getLinks()) {
//            // после того, как пользователь сделал выбор на странице агрегатора,
//            // в объект payment агрегатор помещает ответ -
//            // одну из двух гиперссылок, заданных ему выше
//            if(link.getRel().equals("approval_url")) {
//                // response.sendRedirect(link.getHref());
//                // в зависимости от того, отменил или подтвердил пользователь оплату,
//                // выполняем перенаправление на один из двух ресурсов
//                return "redirect:" + link.getHref();
//            }
//        }
//        return "redirect:http://localhost:3000/shop/payment_error";
//    }

    // вызывается перенаправлением из действия payment
    // после того, как получена одна из гиперссылок в ответ на отмену или
    // подтвреждение оплаты,
    // при этом параметры предоставляются агрегатором
//    @GetMapping("/pay/success")
//    public String successPay(
//            @RequestParam("paymentId") String paymentId,
//            @RequestParam("PayerID") String payerId,
//            Authentication authentication,
//            PaymentService paymentService
//    ) throws PayPalRESTException {
//        Cart cart = cartService.getCart(authentication);
//        // завершение платежа
//        paymentService.executePayment(paymentId, payerId, cart);
//        cartService.clearCartItems(authentication);
//        // возврат перенаправления вместо имени представления -
//        // на страницу, сообщающую об успешном завершении оплаты
//        return "redirect:http://localhost:3000/shop/payment_success";
//    }

//    @GetMapping("/pay/cancel")
//    public String cancelPay() {
//        return "redirect:http://localhost:3000/shop/payment_cancel";
//    }
}
