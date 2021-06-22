import {action, makeObservable, observable} from "mobx"

class CommonStore {

    // Наблюдаемые свойства

    // Флаг ожидания загрузки данных с сервера
    @observable loading: boolean = false
    // Текст ошибки, усли он подключен
    @observable error: string = ''
    //  URL REST API основной адрес
    // @observable basename: string = 'http://localhost:8080/shop/api'
    // @observable basename: string = 'http://46.160.84.84:8080/shop/api'
    basename: string = 'http://10.10.208.10:8080/shop/api'
    //  URL REST API основной адрес
    // @observable authBasename: string = 'http://localhost:8080/shop'
    authBasename: string = 'http://10.10.208.10:8080/shop'
    //@observable authBasename: string = 'http://46.160.84.84:8080/shop'

    constructor () {
        makeObservable(this)
    }

    // Действия, которые могут менять значение наблюдаемых свойств

    // Установка значения для флага ожидания загрузки
    @action setLoading (loading: boolean): void {
        this.loading = loading
    }

    @action setError (error: string): void {
        this.error = error
    }

    @action clearError (): void {
        this.error = ''
    }
}


// Делаем доступрым для импорта из текущего модуля
// Сам тип хранилища CommonStore
// import { CommonStore } from 'CommonStore'
export { CommonStore }
// Делаем доступным для импорта из текущего модуля по умолчанию
// Экземпляр общего хранилища типа CommonStore
// import name from 'CommonStore'
export default new CommonStore()