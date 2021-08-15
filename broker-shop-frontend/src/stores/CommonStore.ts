import {action, makeObservable, observable} from "mobx"
import img1 from '../images/partsCake/1.jpg'
import img2 from '../images/partsCake/2.jpg'
import img3 from '../images/partsCake/3.jpg'
import img4 from '../images/partsCake/4.jpg'
import img5 from '../images/partsCake/5.jpg'
import img6 from '../images/partsCake/6.jpg'
class CommonStore {

    // Наблюдаемые свойства

    // Флаг ожидания загрузки данных с сервера
    @observable loading: boolean = false
    // Текст ошибки, усли он подключен
    @observable error: string = ''
    //  URL REST API основной адрес
    basename: string = 'http://46.160.84.84:8080/shop/api'
    //  URL REST API основной адрес
    authBasename: string = 'http://46.160.84.84:8080/shop'

    article: string = '02200'
    marks = [
        {
            value: 0,
            label: '2 кг',
            text: '3-5 человек'
        },
        {
            value: 20,
            label: '2.5 кг',
            text: '5-7 человек'
        },
        {
            value: 40,
            label: '3 кг',
            text: '7-9 человек'
        },
        {
            value: 60,
            label: '4 кг',
            text: '9-11 человек'
        },
        {
            value: 80,
            label: '5 кг',
            text: '11-13 человек'
        },
        {
            value: 100,
            label: '6 кг',
            text: '13-15 человек'
        },
    ];
    images = [
        {
            title: 'qwerqwer',
            label: 'крем "тафито" + варёная сгущенка + масло + шоколад и эклеры со сливками',
            imgPath: img1
        },
        {
            title: 'eqwrewr',
            label: 'творожный крем + фрукты(банан, киви, клубника)',
            imgPath: img2
        },
        {
            title: 'qwerwer',
            label: 'заварной крем, взбитые сливки',
            imgPath: img3
        },
        {
            title: 'qwererwqewr',
            label: 'заварной крем',
            imgPath: img4
        },
        {
            title: 'ewqrqewrq',
            label: 'сливочный крем',
            imgPath: img5
        },
        {
            title: 'rqewrqwer',
            label: 'взбитые сливки + кини + шоколадный бисквит',
            imgPath: img6
        },
    ];
    @observable activeMark: string | null = null


    constructor () {
        makeObservable(this)
    }

    @action setActiveMark(value: string) {
        this.activeMark = value
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