import {action, computed, makeObservable, observable} from 'mobx'
import commonStore from './CommonStore'
import CartItemModelCustom from "../models/CartItemModelCustom";

class CartStore {

    private HTTP_STATUS_OK: number = 200
    private HTTP_STATUS_CREATED: number = 201

    // список всех элементов корзины покупателя
    @observable cartItems: CartItemModelCustom[] = []
    // отображать ли корзину?
    @observable cartShown: boolean = false

    @observable data: CartItemModelCustom | null = null

    constructor() {
        makeObservable(this)

    }

    // вычисляемое свойство (пересчитывается при каждом обращении к нему
    // и при каждом изенении значения в наблюдаемых свойствах,
    // участвующих в формировании возвращаемого результата после слова return)
    // - получение количества всех товаров в корзине
    @computed get cartItemsCount () {
        return this.cartItems
            .map(cartItem => cartItem.quantity)
            .reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0)
    }

    // получение полной суммы за все товары в корзине
    @computed get cartItemsTotalPrice () {
        return this.cartItems
            .map(cartItem => Number(cartItem.price) * Number(cartItem.quantity))
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
            .toFixed(2)
    }

    @action sendMail(){
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(`${commonStore.basename}/mail/`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'address': 'rjcvjchzljv9@gmail.com',
                'message': this.cartItems,
            })

        }).then((response) => {
            return response.json()
        }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // this.cartItems =
                    //     JSON.parse(
                    //         decodeURIComponent(
                    //             JSON.stringify(responseModel.data)
                    //                 .replace(/(%2E)/ig, '%20')
                    //         )
                    //     )
                } else if (responseModel.status === 'fail') {
                    commonStore.setError(responseModel.message)
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }

    @action dataReset(){
        // console.log(
        //     this.data?.productId,
        //     this.data?.price,
        //     this.data?.title,
        //     this.data?.filling,
        //     this.data?.weight,
        //     this.data?.description,
        //     this.data?.sculpture,
        //     this.data?.quantity,
        //     )
        this.data = new CartItemModelCustom(
            0,
            0,
            '',
            false,
            null,
            null,
            0,
            1,
            ''
        )
        // console.log(
        //     this.data?.productId,
        //     this.data?.price,
        //     this.data?.title,
        //     this.data?.filling,
        //     this.data?.weight,
        //     this.data?.description,
        //     this.data?.sculpture,
        //     this.data?.quantity,
        // )
    }

    @action setPhoneNumber(phoneNumber: string) {
        if (this.data) {
            this.data.phoneNumber = phoneNumber
        }
    }

    @action setProductId(id: number | undefined) {
        if (this.data) {
            this.data.productId = id
        }
    }

    @action setPrice(price: number | undefined) {
        if (this.data) {
            this.data.price = price
        }
    }

    @action setTitle(title: string | null | undefined) {
        if (this.data) {
            this.data.title = title
        }
    }

    @action setDescription(description: string | null) {
        if (this.data) {
            this.data.description = description
        }
    }

    @action setSculpture(sculpture: boolean) {
        if (this.data) {
            this.data.sculpture = sculpture
        }
    }

    @action setWeight(weight: number) {
        if (this.data) {
            this.data.weight = weight
        }
    }

    @action setFilling(filling: string) {
        if (this.data) {
            this.data.filling = filling
        }
    }

    @action addData(data: CartItemModelCustom) {
        this.data = data
    }

    @action setCartVisibility (open: boolean) {
        this.cartShown = open
    }

    @action fetchCartItems () {
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(`${commonStore.basename}/cart`, {
            credentials: 'include'
        }).then((response) => {
            return response.json()
        }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    this.cartItems =
                        JSON.parse(
                            decodeURIComponent(
                                JSON.stringify(responseModel.data)
                                    .replace(/(%2E)/ig, '%20')
                            )
                        )
                } else if (responseModel.status === 'fail') {
                    commonStore.setError(responseModel.message)
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }

    // действие добавление товара в корзину
    // с указанием ИД товара и функции обратного вызова,
    // которую нужно вызвать после ответа сервера
    @action addToCart(productId: number, notifySuccess: () => void) {
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(`${commonStore.basename}/cart/` + productId,{
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'productId': this.data?.productId,
                'weight': this.data?.weight,
                'filling': this.data?.filling,
                'sculpture': this.data?.sculpture,
                'title': this.data?.title,
                'description': this.data?.description,
                'price': this.data?.price,
                'quantity': this.data?.quantity,
                'phoneNumber': this.data?.phoneNumber,
            })
        }).then((response) => {
            return response.json()
        }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // запрос на получение всех элементов с сервера
                    this.fetchCartItems()
                    // уведомление пользователя об успехе
                    notifySuccess()
                } else if (responseModel.status === 'fail') {
                    commonStore.setError(responseModel.message)
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }

    @action subtractFromCart(productId: number, notifySuccess: () => void) {
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(`${commonStore.basename}/cart/` + productId,{
            method: 'PATCH',
            credentials: 'include'
        }).then((response) => {
            return response.json()
        }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // запрос на получение всех элементов с сервера
                    this.fetchCartItems()
                    // уведомление пользователя об успехе
                    notifySuccess()
                } else if (responseModel.status === 'fail') {
                    commonStore.setError(responseModel.message)
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }

    @action deleteAllFromCart(productId: number, notifySuccess: () => void) {
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(`${commonStore.basename}/cart/` + productId,{
            method: 'DELETE',
            credentials: 'include'
        }).then((response) => {
            return response.json()
        }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // запрос на получение всех элементов с сервера
                    this.fetchCartItems()
                    // уведомление пользователя об успехе
                    notifySuccess()
                } else if (responseModel.status === 'fail') {
                    commonStore.setError(responseModel.message)
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }

    @action deleteFullFromCart(notifySuccess: () => void) {
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(`${commonStore.basename}/cart/`,{
            method: 'DELETE',
            credentials: 'include'
        }).then((response) => {
            return response.json()
        }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // запрос на получение всех элементов с сервера
                    this.fetchCartItems()
                    // уведомление пользователя об успехе
                    notifySuccess()
                } else if (responseModel.status === 'fail') {
                    commonStore.setError(responseModel.message)
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }


}
export {CartStore}
export default new CartStore()