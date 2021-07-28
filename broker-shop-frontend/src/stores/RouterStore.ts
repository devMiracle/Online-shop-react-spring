import {action, makeObservable, observable, reaction} from 'mobx'
import history from "../history"
import RouteModel from "../models/RouteModel"
import userStore from "./UserStore"
import Home from "../components/pages/Home"
import About from "../components/pages/About"
import Shopping from "../components/pages/Shopping"
import SignIn from "../components/pages/SignIn"
import SignUp from "../components/pages/SignUp"
import DashboardCategories from "../components/pages/admin/DashboardCategories"
import DashboardProducts from "../components/pages/admin/DashboardProducts"
import Dashboard from "../components/pages/admin/Dashboard"
import Categories from "../components/pages/Categories"
import Sections from "../components/pages/Sections"
import Order from "../components/pages/Order"
import Cart from "../components/pages/Cart"
import Confidentiality from '../components/pages/Confidentiality'
import Return from "../components/pages/Return"
import Items from "../components/pages/Items";
class RouterStore {

    // список моделей роутов для гостя
    private anonymousRoutes: Array<RouteModel> = [
        { path: '/', name: 'торты', visible: true, Component: Home },
        { path: '/items', name: 'позиции', visible: false, Component: Items },
        { path: '/confidentiality', name: 'конфиденциальность', visible: false, Component: Confidentiality },
        { path: '/return', name: 'возврат', visible: false, Component: Return },
        { path: '/sections', name: 'разрезы', visible: true, Component: Sections },
        { path: '/order', name: 'заказать', visible: true, Component: Order },
        { path: '/cart', name: 'корзина', visible: true, Component: Cart },
        { path: '/shopping', name: 'покупки', visible: false, Component: Shopping },
        { path: '/about', name: 'о нас', visible: true, Component: About },
        { path: '/signin', name: 'вход', visible: false, Component: SignIn },
        { path: '/signup', name: 'регистрация', visible: false, Component: SignUp }
    ]

    // список моделей роутов для аунтентифицированного пользователя
    private loggedRoutes: Array<RouteModel> = [
        { path: '/', name: 'торты', visible: true, Component: Home },
        { path: '/items', name: 'позиции', visible: false, Component: Items },
        { path: '/confidentiality', name: 'конфиденциальность', visible: false, Component: Confidentiality },
        { path: '/return', name: 'возврат', visible: false, Component: Return },
        { path: '/sections', name: 'разрезы', visible: true, Component: Sections },
        { path: '/order', name: 'заказать', visible: true, Component: Order },
        { path: '/cart', name: 'корзина', visible: true, Component: Cart },
        { path: '/shopping', name: 'покупки', visible: false, Component: Shopping },
        { path: '/about', name: 'о нас', visible: true, Component: About },
        { path: '/auth:out', name: 'выйти', visible: true, Component: Categories }
    ]

    // список моделей роутов для аунтентифицированного пользователя с ролью админ
    private adminRoutes: Array<RouteModel> = [
        { path: '/', name: 'торты', visible: true, Component: Home },
        { path: '/items', name: 'позиции', visible: false, Component: Items },
        { path: '/confidentiality', name: 'конфиденциальность', visible: false, Component: Confidentiality },
        { path: '/return', name: 'возврат', visible: false, Component: Return },
        { path: '/sections', name: 'разрезы', visible: true, Component: Sections },
        { path: '/order', name: 'заказать', visible: true, Component: Order },
        { path: '/cart', name: 'корзина', visible: true, Component: Cart },
        { path: '/shopping', name: 'покупки', visible: false, Component: Shopping },
        { path: '/about', name: 'о нас', visible: true, Component: About },
        { path: '/admin', name: 'Dashboard' , visible: true, Component: Dashboard },
        { path: '/auth:out', name: 'выйти', visible: true, Component: Categories }
    ]



    // список моделей роутов для аунтентифицированного пользователя
    // private loggedRoutes: Array<RouteModel> = [
    //     { path: '/', name: 'Home', visible: true, Component: Home },
    //     { path: '/shopping', name: 'Shopping', visible: true, Component: Shopping },
    //     { path: '/about', name: 'About', visible: true, Component: About },
    //     { path: '/auth:out', name: 'Log Out', visible: true, Component: Categories }
    // ]

    // список моделей роутов для аунтентифицированного пользователя с ролью админ
    // private adminRoutes: Array<RouteModel> = [
    //     { path: '/', name: 'Home', visible: true, Component: Home },
    //     { path: '/shopping', name: 'Shopping', visible: true, Component: Shopping },
    //     { path: '/about', name: 'About', visible: true, Component: About },
    //     { path: '/admin', name: 'Dashboard' , visible: true, Component: Dashboard },
    //     { path: '/admin/categories', name: 'DashboardCategories' , visible: true, Component: DashboardCategories },
    //     { path: '/admin/products', name: 'DashboardProducts' , visible: true, Component: DashboardProducts },
    //     { path: '/auth:out', name: 'Log Out', visible: true, Component: Categories }
    // ]

    // наблюдаемый текущий список роутов
    // (по умолчнию - для гостя)
    @observable routes: Array<RouteModel> = this.anonymousRoutes

    constructor() {
        makeObservable(this)
    }

    // установить в качестве текущего список роутов для гостя
    @action setAnonymousRoutes() {
        this.routes = this.anonymousRoutes
    }

    // установить в качестве текущего список роутов для аунтентифицированного пользователя
    @action setLoggedRoutes() {
        this.routes = this.loggedRoutes
    }

    // установить в качестве текущего список роутов для аунтентифицированного пользователя администратора
    @action setAdminRoutes() {
        this.routes = this.adminRoutes
    }

    // реакция на изменение значения наблюдаемого свойства userStore.user:
    // если userStore.user установлен,
    // в текущем списке моделей роутов ищем
    // модель, в свойстве name которой содержится подстрока 'Sign out'
    userReaction = reaction(
        () => userStore.user,
        (user) => {
            if (user) {
                // поиск модели маршрута выхода из учетной записи
                let signOutRoute
                if (user.roleName.includes('ADMIN')) {
                    signOutRoute = this.adminRoutes
                        .find(route => route['path'].includes('/auth:out'))
                } else {
                    signOutRoute = this.loggedRoutes
                        .find(route => route['path'].includes('/auth:out'))
                }
                // в модель роута "Выход" в свойство name
                // записываем текст: Sign out + ИМЯ_ПОЛЬЗОВАТЕЛЯ,
                // где ИМЯ_ПОЛЬЗОВАТЕЛЯ узнаем из наблюдаемого свойства userStore.user

                if (signOutRoute) {
                    signOutRoute['name'] = `Log Out (${user.name})`
                }
                if (user.roleName.includes('ADMIN')) {
                    this.setAdminRoutes()
                } else  {
                    // ... и меняем текущий список моделей роутов
                    // - на список моделей роутов для вошедшего пользователя
                    this.setLoggedRoutes()
                }

                // выполняем переход на раздел 'Главная'
                history.replace('/')
            } else {
                // если пользователь не установлен -
                // меняем текущий список моделей роутов
                // на список моделей роутов для пользователя-гостя
                this.setAnonymousRoutes()
                // выполняем переход на раздел 'Вход'
                history.replace('/signin')
            }
        }
    )
}

export {RouterStore}
export default new RouterStore() 