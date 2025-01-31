import {action, makeObservable, observable} from 'mobx'
import history from "../history";
import Product from '../models/ProductModel'
import commonStore from './CommonStore'
import categoryStore from './CategoryStore'

class ProductStore {
    private HTTP_STATUS_OK: number = 200
    private HTTP_STATUS_CREATED: number = 201
    private HTTP_STATUS_NO_CONTENT: number = 204

    private allowGetPriceBounds: boolean = true
    private allowGetQuantityBounds: boolean = true

    @observable currentProduct: Product | undefined
    @observable products: Array<Product> = []
    @observable products6: Array<Product> = []
    @observable productId: number | null = null
    @observable title: string = ''
    @observable description: string = ''
    @observable quantity: number = 0
    @observable price: number = 0
    @observable categoryId: number | null = null
    @observable image: string = ''

    // для фильтра и сортировки
    orderBy: string = 'id'
    sortingDirection: string = 'DESC'
    @observable categories: number[] = []
    allowFetchFilteredProducts: boolean = true
    priceFrom: number | null = null
    priceTo: number | null = null
    quantityFrom: number | null = null
    quantityTo: number | null = null
    priceFromBound: number = 0
    priceToBound: number = 1000000
    quantityFromBound: number = 0
    quantityToBound: number = 1000000
    // цельная строка - значение url-параметра search
    searchString: string = ''
    // сторка для определенного тавара
    urlItemString: string = ''
    constructor() {
        makeObservable(this)
    }

    @action clearAllProducts() {
        this.products = []
    }

    // сборка веб-адреса для раздела покупок из значений
    // отдельных полей состояния фильтра и установка его в адресную строку браузера
    @action changeShoppingUrlParams () {
        // console.log('changeShoppingUrlParams')
        history.push({
            pathname: '/items',
            search: `?orderBy=${this.orderBy}
                        &sortingDirection=${this.sortingDirection}
                        &search=
                            price>:${this.priceFrom};
                            price<:${this.priceTo};
                            quantity>:${this.quantityFrom};
                            quantity<:${this.quantityTo}
                            ${(this.categories && this.categories.length > 0) ? ';category:' + JSON.stringify(this.categories) : ''}`
                .replace(/\s/g, '')
        })
    }

    @action setSearchString () {
        this.searchString = `price>:${this.priceFrom};
                            price<:${this.priceTo};
                            quantity>:${this.quantityFrom};
                            quantity<:${this.quantityTo}
                            ${(this.categories && this.categories.length > 0) ? ';category:' + JSON.stringify(this.categories) : ''}`
                .replace(/\s/g, '')
    }


    @action setUrlItemString(str: string) {
        this.urlItemString = str
    }

    @action setCurrentProduct(id: number | null) {
        this.currentProduct =
            this.products.find(p => p.id === id)
        if (this.currentProduct) {
            categoryStore.setCurrentCategoryId(this.currentProduct.category.id)
        }
    }

    @action setProductTitle(title: string) {
        this.title = title
    }

    @action setProductCategory(categoryId: number) {
        this.categoryId = categoryId
    }

    @action setProductDescription(description: string) {
        this.description = description
    }

    @action setProductPrice(price: number) {
        this.price = price
    }

    @action setProductQuantity(quantity: number) {
        this.quantity = quantity
    }

    @action setProductImage(image: string) {
        this.image = image
    }

    // Загрузить товар по ID
    @action fetchProductById(id: number | null, callback?: (() => void) | undefined) {
        // console.log("fetchProductById")
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(commonStore.basename + `/product/${id}`)
        .then((response) => {
            return response.json()
        }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // полученный объект модели может содержать
                    // свойства, значения которых закодированы из UTF-8 в ASCII,
                    // поэтому производим полное раскодирование:
                    // ts-object конвертируем в json-string (stringify),
                    // декодируем (decodeURIComponent)
                    // json-string конвертируем в  ts-object (parse)
                    this.currentProduct = JSON.parse(
                        decodeURIComponent(
                            JSON.stringify(responseModel.data)
                                .replace(/(%2E)/ig, '%20')
                        )
                    )
                    if (callback) {
                        callback()
                    }
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
    // Загрузить все продукты с сервера
    @action fetchProducts() {
        // console.log("fetchProducts")
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(commonStore.basename + '/products')
            .then((response) => {
                return response.json()
            }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // полученный объект модели может содержать
                    // свойства, значения которых закодированы из UTF-8 в ASCII,
                    // поэтому производим полное раскодирование:
                    // ts-object конвертируем в json-string (stringify),
                    // декодируем (decodeURIComponent)
                    // json-string конвертируем в  ts-object (parse)
                    this.products =
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
            //this.changeShoppingUrlParams()
        }))
    }
    // Загрузить 6 последних продуктов с сервера
    @action fetch6LastProducts() {
        // console.log("fetch6LastProducts")
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(commonStore.basename + '/products/get6')
            .then((response) => {
                return response.json()
            }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // полученный объект модели может содержать
                    // свойства, значения которых закодированы из UTF-8 в ASCII,
                    // поэтому производим полное раскодирование:
                    // ts-object конвертируем в json-string (stringify),
                    // декодируем (decodeURIComponent)
                    // json-string конвертируем в  ts-object (parse)
                    this.products6 =
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
            //this.changeShoppingUrlParams()
        }))
    }
    // Добавить продукт
    @action add() {
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(commonStore.basename + '/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'title': encodeURIComponent(this.title),
                'description': encodeURIComponent(this.description),
                'price': this.price,
                'quantity': this.quantity,
                'image': this.image,
                'categoryId': this.categoryId
            })
        }).then((response) => {
            return response.status
        }).then(responseStatusCode => {
            if (responseStatusCode) {
                if (responseStatusCode === this.HTTP_STATUS_CREATED) {
                    //this.fetchProducts()
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }
    // Обновить продукт
    @action update () {
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(`${commonStore.basename}/products/${this.productId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'title': encodeURIComponent(this.title),
                'description': encodeURIComponent(this.description),
                'price': this.price,
                'quantity': this.quantity,
                'image': this.image,
                'categoryId': this.categoryId
            })
        }).then((response) => {
            return response.status
        }).then(responseStatusCode => {
            if (responseStatusCode) {
                if (responseStatusCode === this.HTTP_STATUS_OK) {
                    //this.fetchProducts()
                    // this.setProductTitle('')
                    // this.setCurrentProduct(null)
                }
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }
    // Удалить продукт
    @action deleteProduct() {
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(commonStore.basename + '/products/' + this.productId,{
            method: 'DELETE'
        }).then((response) => {
            if (response.status === this.HTTP_STATUS_NO_CONTENT) {
                //this.fetchProducts()
                // this.setCurrentProduct(null)
            }
        }).catch((error) => {
            commonStore.setError(error.message)
            throw error
        }).finally(action(() => {
            commonStore.setLoading(false)
        }))
    }

    // Получить граничные значения цен товаров
    @action fetchProductPriceBounds() {
        // console.log("fetchProductPriceBounds")
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(commonStore.basename + '/products/price-bounds')
            .then((response) => {
                return response.json()
            }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    // сохранение минимума и максимума цены
                    // в наблюдаемых свойствах
                    this.priceFromBound = responseModel.data.min
                    this.priceToBound = responseModel.data.max
                    // если разрешено применение граничных значений цены
                    // (то есть, в данный момент не происходит ожидание ранее запрошенных значений)
                    if (this.allowGetPriceBounds) {
                        // если текущие границы на форме фильтрации не установлены -
                        if (!this.priceFrom) {
                            // устанавливаем их
                            this.priceFrom = this.priceFromBound
                        }
                        if (!this.priceTo) {
                            this.priceTo = this.priceToBound
                        }
                        // после изменения значений фильтра
                        // вызываем обновление адресной строки
                        // this.setSearchString()
                        // this.changeShoppingUrlParams()
                    }
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
    // Получить продукты с границей по количеству
    @action fetchProductQuantityBounds(testtest: () => void) {
        // console.log("fetchProductQuantityBounds")
        commonStore.clearError()
        commonStore.setLoading(true)
        fetch(commonStore.basename + '/products/quantity-bounds')
            .then((response) => {
                return response.json()
            }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    this.quantityFromBound = responseModel.data.min
                    this.quantityToBound = responseModel.data.max
                    if (this.allowGetQuantityBounds) {
                        if (!this.quantityFrom) {
                            this.quantityFrom = this.quantityFromBound
                        }
                        if (!this.quantityTo) {
                            this.quantityTo = this.quantityToBound
                        }
                        // this.setSearchString()
                        // this.changeShoppingUrlParams()
                        testtest()
                    }
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

    // Вызываемый явно метод, когда изменилась адресная строка -
    // получение с сервера списка товаров согласно состояния фильтра
    @action getFilteredProducts () {
        commonStore.clearError()
        commonStore.setLoading(true)
        // составление строки запроса к действию контроллера,
        // возвращающему отфильтрованный отсортированный список моделей товаров
        const filteredProductsUrl =
            `${commonStore.basename}/products/filtered
                        ::orderBy:${this.orderBy}
                        ::sortingDirection:${this.sortingDirection}
                        /?search=
                            price>:${this.priceFrom};
                            price<:${this.priceTo}
                            ${(this.categories && this.categories.length > 0) ? ';category:' + JSON.stringify(this.categories) : ''}`
        // перед запросом на сервер удаляем все пробельные символы из адреса,
        // потому что описанный выше блок кода добавляет их для форматирования
        fetch(filteredProductsUrl.replace(/\s/g,''))
            .then((response) => {
                return response.json()
            }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    this.products =
                        JSON.parse(
                            decodeURIComponent(
                                JSON.stringify(responseModel.data)
                                    .replace(/(%2E)/ig, '%20')// ASCII -> UTF-8 (In title and description)
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
    // установка параметра свободного запроса фильтрации,
    // полученного из адресной строки браузера,
    // в состояние локального хранилища
    @action setFilterDataSearchString(searchString: string) {
        this.searchString = searchString
        // this.changeShoppingUrlParams()
    }
    @action setOrderBy(fieldName: string) {
        this.orderBy = fieldName
        // this.changeShoppingUrlParams()
    }
    @action setSortingDirection(direction: string) {
        this.sortingDirection = direction
        // this.changeShoppingUrlParams()
    }
    // получение отфильтрованных отсортированных товаров с сервера
    @action fetchFilteredProducts () {
        // console.log("fetchFilteredProducts")
        commonStore.clearError()
        commonStore.setLoading(true)
        // составление строки запроса к действию контроллера,
        // возвращающему отфильтрованный отсортированный список моделей товаров
        const filteredProductsUrl =
            `${commonStore.basename}/products/filtered
                ::orderBy:${this.orderBy}
                ::sortingDirection:${this.sortingDirection}
                /?search=${this.searchString}`
        // console.log(this.searchString)
        // перед запросом на сервер удаляем все пробельные символы из адреса,
        // потому что описанный выше блок кода добавляет их для форматирования
        fetch(filteredProductsUrl.replace(/\s/g, ''))
            .then((response) => {
                return response.json()
            }).then(responseModel => {
            if (responseModel) {
                if (responseModel.status === 'success') {
                    this.products =
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
            this.setAllowFetchFilteredProducts(true)
            commonStore.setLoading(false)
        }))
    }

    // блокировка повтороного использования фильтра,
    // которую можно устанавливать,
    // когда одно использование уже начато и еще не завершилось
    @action setAllowFetchFilteredProducts(allow: boolean) {
        this.allowFetchFilteredProducts = allow
    }

    // установка содержимого списка идентификаторов категорий
    // для фильтра
    @action setFilterDataCategory(id: number, isChecked: boolean) {
        // пытаемся найти из имеющегося списка идентификаторов идентификатор категории,
        // состояние выбора которой сейчас изменилось
        const categoryId =
            this.categories.find(categoryId => categoryId === id)
        // если такого идентифкатора не было в списке,
        // и состояние переключлось в "выбран" -
        // добавляем в список
        if (!categoryId && isChecked) {
            this.categories.push(id)
            // если такой идентифкатор был в списке,
            // и состояние переключлось в "не выбран" -
            // удаляем из списка
        } else if (categoryId && !isChecked) {
            this.categories =
                this.categories.filter(categoryId => categoryId !== id)
        }
        // запрос на бэкенд для получения списка моделей товаров
        // согласно новому состоянию фильтра (набора свойств локального хранилища
        // для фильтрации)
        // this.changeShoppingUrlParams()
    }
    @action setCategoryId(...id: number[]) {
        this.categories = id
    }
    @action clearAllCategoryId() {
        this.categories = []
        // this.changeShoppingUrlParams()
    }

    @action setFilterDataPriceFrom(priceFrom: number) {
        this.priceFrom = priceFrom
        // this.handlePriceBoundsValues()
    }

    @action setFilterDataPriceTo(priceTo: number) {
        this.priceTo = priceTo
        // this.handlePriceBoundsValues()
    }

    @action setFilterDataQuantityFrom(quantityFrom: number) {
        this.quantityFrom = quantityFrom
        // this.handleQuantityBoundsValues()
    }

    @action setFilterDataQuantityTo(quantityTo: number) {
        this.quantityTo = quantityTo
        // this.handleQuantityBoundsValues()
    }

    // если поля границ цены состояния фильтра пустуют -
    // предоставить пользователю три секунды на ввод этих данных,
    // а затем, если границы не получены от пользоваетеля,
    // запросить их с сервера и запустить изменение адресной строки
    private handlePriceBoundsValues () {
        if (this.priceFrom && this.priceTo) {
            this.allowGetPriceBounds = false
            setTimeout(() => {
                if(this.allowGetPriceBounds) {
                    this.fetchProductPriceBounds()
                }
            }, 3500)
            this.changeShoppingUrlParams()
        } else {
            this.allowGetPriceBounds = true
            setTimeout(() => {
                if(this.allowGetPriceBounds) {
                    this.fetchProductPriceBounds()
                }
            }, 3000)
        }
    }

    private handleQuantityBoundsValues () {
        if (this.quantityFrom && this.quantityTo) {
            this.allowGetQuantityBounds = false
            setTimeout(() => {
                if(this.allowGetQuantityBounds) {
                    this.fetchProductQuantityBounds(() => {
                        console.log("done!")
                    })
                }
            }, 3500)
            this.changeShoppingUrlParams()
        } else {
            this.allowGetQuantityBounds = true
            setTimeout(() => {
                if(this.allowGetQuantityBounds) {
                    this.fetchProductQuantityBounds(() => {
                        console.log("done!")
                    })
                }
            }, 3000)
        }
    }

}
export {ProductStore}
export default new ProductStore()