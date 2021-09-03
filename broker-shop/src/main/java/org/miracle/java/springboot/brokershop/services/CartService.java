package org.miracle.java.springboot.brokershop.services;

import org.miracle.java.springboot.brokershop.entities.Product;
import org.miracle.java.springboot.brokershop.models.Cart;
import org.miracle.java.springboot.brokershop.models.CartItem;
import org.miracle.java.springboot.brokershop.models.CartModel;
import org.miracle.java.springboot.brokershop.models.ResponseModel;
import org.miracle.java.springboot.brokershop.repositories.CartMongoDao;
import org.miracle.java.springboot.brokershop.repositories.ProductDao;
import org.miracle.java.springboot.brokershop.repositories.UserDao;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Служба для добавления, удаления и изменения количества
 * товаров в корзине покупателя
 * @author yurii
 * */
@Service
public class CartService {

    private final ProductDao productDao;

    private final UserDao userDao;

    private final CartMongoDao cartMongoDao;

    /**
     * @param productDao репозиторий для чтения/записи сущностей "Товар" в РБД
     * @param userDao репозиторий для чтения/записи сущностей "Пользователь" в РБД
     * @param cartMongoDao репозиторий для чтения/записи моделей "Корзина" в хранилище Mongo
     * */
    public CartService(ProductDao productDao, UserDao userDao, CartMongoDao cartMongoDao) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.cartMongoDao = cartMongoDao;
    }

    /**
     * Получает объект корзины покупок из хранилища Mongo по данным текущего пользователя
     * @param authentication стандартный объект SpringSecurity, содержащий имя и название роли текущего пользователя
     * */
    // Даже если пользователь не атенцирован, можно позволить ему пользоваться корзиной
    public Cart getCart(Authentication authentication) {
        // есть ли текущий аутентифицированный пользователь
        if (authentication != null && authentication.isAuthenticated()) {
            // из mysql db находим по имени учетную запись пользователя,
            // из нее - идентификатор
            Long userId =
                    userDao.findUserByName(authentication.getName()).getId();
            // из mongo db по идентификатору - объект корзины пользователя
            Cart cart = cartMongoDao.findCartByUserId(userId);
            if (cart == null) {
                cart = new Cart();
                cart.setUserId(userId);
            }
            return cart;
        } else {
            return null;
        }
    }

    // получить все элементы корзины текущего пользователя
    public ResponseModel getCartItems (Authentication authentication) {
        Cart cart = this.getCart(authentication);
        if (cart != null) {
            return ResponseModel.builder()
                    .status(ResponseModel.SUCCESS_STATUS)
                    .message("Cart data fetched successfully")
                    .data(cart.getCartModels())
                    .build();
        } else {
            return ResponseModel.builder()
                    .status(ResponseModel.FAIL_STATUS)
                    .message("No cart")
                    .build();
        }
    }

    // изменить число определенного товара в объекте корзины
    /*Первый способ*/
//    public ResponseModel changeCartItemCount(Authentication authentication, Long productId, CartItem.Action action) {
//        Cart cart = this.getCart(authentication);
//        CartItem currentCartItem = null;
//        // в БД находим описание товара по его ИД
//        Product product = productDao.findById(productId).get();
//        // в объекте корзины пытаемся найти элемент списка товаров в корзине,
//        // у которого ИД описания товара такой же, как заданный для изменения
//        Optional<CartItem> currentCartItemOptional =
//                cart.getCartItems()
//                        .stream()
//                        .filter((item) -> item.getProductId().equals(productId))
//                        .findFirst();
//        // если в корзине уже был хотя бы один такой товар
//        if (currentCartItemOptional.isPresent()) {
//            currentCartItem = currentCartItemOptional.get();
//        } else {
//            // если нет - добавляем товар в корзину с указанием его количества равным 0
//            currentCartItem =
//                    CartItem.builder()
//                            .productId(productId)
//                            .name(product.getName())
//                            .price(product.getPrice())
//                            .quantity(0)
//                            .build();
//            cart.getCartItems().add(currentCartItem);
//        }
//        if (action != null) {
//            switch (action) {
//                case ADD:
//                    // увеличение числа товара в корзтине на 1
//                    currentCartItem.setQuantity(currentCartItem.getQuantity() + 1);
//                    break;
//                case SUB:
//                    // уменьшение числа товара в корзтине на 1,
//                    // но если осталось 0 или меньше - полное удаление товара из корзины
//                    currentCartItem.setQuantity(currentCartItem.getQuantity() - 1);
//                    if (currentCartItem.getQuantity() <= 0) {
//                        cart.getCartItems().remove(currentCartItem);
//                    }
//                    break;
//                case REM:
//                    // безусловное полное удаление товара из корзины
//                    cart.getCartItems().remove(currentCartItem);
//                    break;
//                default:
//                    break;
//            }
//        }
//        // сохранение объекта корзины в MongoDB -
//        // первичное или обновление
//        cartMongoDao.save(cart);
//        return ResponseModel.builder()
//                .status(ResponseModel.SUCCESS_STATUS)
//                .message("Cart data changed successfully")
//                .data(cart.getCartItems())
//                .build();
//    }
    /*Второй способ*/
    public ResponseModel changeCartItemCount(CartModel cartModel, Authentication authentication, Long productId, CartItem.Action action) {
        System.out.println(cartModel); // TODO: убрать
        Cart cart = this.getCart(authentication);
        CartModel currentCartItem = null;
        // в БД находим описание товара по его ИД
        Product product = productDao.findById(productId).get();
        // в объекте корзины пытаемся найти элемент списка товаров в корзине,
        // у которого ИД описания товара такой же, как заданный для изменения
        Optional<CartModel> currentCartItemOptional =
                cart.getCartModels()
                        .stream()
                        .filter((item) -> item.getProductId().equals(productId))
                        .findFirst();
        // если в корзине уже был хотя бы один такой товар
        if (currentCartItemOptional.isPresent()) {
            currentCartItem = currentCartItemOptional.get();
        } else {
            // если нет - добавляем товар в корзину с указанием его количества равным 0
            currentCartItem =
                    CartModel.builder()
                            .productId(cartModel.getProductId())
                            .weight(cartModel.getWeight())
                            .filling(cartModel.getFilling())
                            .sculpture(cartModel.getSculpture())
                            .title(cartModel.getTitle())
                            .description(cartModel.getDescription())
                            .price(cartModel.getPrice())
                            .quantity(0)
                            .build();
            cart.getCartModels().add(currentCartItem);
        }
        if (action != null) {
            switch (action) {
                case ADD:
                    // увеличение числа товара в корзтине на 1
                    currentCartItem.setQuantity(currentCartItem.getQuantity() + 1);
                    break;
                case SUB:
                    // уменьшение числа товара в корзтине на 1,
                    // но если осталось 0 или меньше - полное удаление товара из корзины
                    currentCartItem.setQuantity(currentCartItem.getQuantity() - 1);
                    if (currentCartItem.getQuantity() <= 0) {
                        cart.getCartModels().remove(currentCartItem);
                    }
                    break;
                case REM:
                    // безусловное полное удаление товара из корзины
                    cart.getCartModels().remove(currentCartItem);
                    break;
                default:
                    break;
            }
        }
        // сохранение объекта корзины в MongoDB -
        // первичное или обновление
        cartMongoDao.save(cart);
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message("Cart data changed successfully")
                .data(cart.getCartModels())
                .build();
    }

    public ResponseModel changeCartItemCount(Authentication authentication, Long productId, CartItem.Action action) {
        Cart cart = this.getCart(authentication);
        CartModel currentCartItem = null;
        // в БД находим описание товара по его ИД
        Product product = productDao.findById(productId).get();
        // в объекте корзины пытаемся найти элемент списка товаров в корзине,
        // у которого ИД описания товара такой же, как заданный для изменения
        Optional<CartModel> currentCartItemOptional =
                cart.getCartModels()
                        .stream()
                        .filter((item) -> item.getProductId().equals(productId))
                        .findFirst();
        // если в корзине уже был хотя бы один такой товар
        if (currentCartItemOptional.isPresent()) {
            currentCartItem = currentCartItemOptional.get();
        } else {
            // если нет - добавляем товар в корзину с указанием его количества равным 0
//            currentCartItem =
//                    CartModel.builder()
//                            .productId(productId)
//                            .name(product.getName())
//                            .price(product.getPrice())
//                            .quantity(0)
//                            .build();
//            cart.getCartModels().add(currentCartItem);
        }
        if (action != null) {
            switch (action) {
                case ADD:
                    // увеличение числа товара в корзтине на 1
                    currentCartItem.setQuantity(currentCartItem.getQuantity() + 1);
                    break;
                case SUB:
                    // уменьшение числа товара в корзтине на 1,
                    // но если осталось 0 или меньше - полное удаление товара из корзины
                    currentCartItem.setQuantity(currentCartItem.getQuantity() - 1);
                    if (currentCartItem.getQuantity() <= 0) {
                        cart.getCartModels().remove(currentCartItem);
                    }
                    break;
                case REM:
                    // безусловное полное удаление товара из корзины
                    cart.getCartModels().remove(currentCartItem);
                    break;
                default:
                    break;
            }
        }
        // сохранение объекта корзины в MongoDB -
        // первичное или обновление
        cartMongoDao.save(cart);
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message("Cart data changed successfully")
                .data(cart.getCartModels())
                .build();
    }

    // удалить из корзины все элементы
    public void clearCartItems (Authentication authentication) {
        Cart cart = getCart(authentication);
        if (cart != null) {
            cart.getCartModels().clear();
            cartMongoDao.save(cart);
        }
    }
}
