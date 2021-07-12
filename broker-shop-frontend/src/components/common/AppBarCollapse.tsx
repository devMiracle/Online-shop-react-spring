import React, {Component} from "react"
import {createStyles, MenuItem} from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"
import ButtonAppBarCollapse from "./ButtonAppBarCollapse"
import {
    NavLink
} from 'react-router-dom'
import {
    ShoppingCart as ShoppingCartIcon
}  from "@material-ui/icons"
import {inject, observer} from "mobx-react"
import {UserStore} from '../../stores/UserStore'
import {CartStore} from '../../stores/CartStore'
import RouteModel from "../../models/RouteModel"

interface IProps {
    routes: Array<RouteModel>
}

interface IInjectedProps extends IProps, WithStyles<typeof styles> {
    userStore: UserStore
    cartStore: CartStore
}

interface IState {
}

const styles = ((theme: Theme) => createStyles({
    root: {
        position: "absolute",
        right: 0,

    },
    buttonBar: {
        // если ширина экрана - мобильная или меньше
        [theme.breakpoints.down("xs")]: {
            // скрываем настольную версию пунктов меню навигации и аутентификации
            display: "none"
        },
        margin: "10px",
        paddingLeft: "16px",
        right: "10px",
        position: "relative",
        width: "100%",
        background: "transparent",
        display: "inline"
    },
    buttonBarItem: {
        '&:hover': {
            backgroundColor: 'rgba(0,181,140,0.4)',
        },
        webkitTransition: 'background-color .3s',
        transition: 'background-color .3s',
        fontSize: '1rem',
        color: '#424242',
        padding: '15px',
        cursor: 'pointer',
        textDecoration: 'none',
    },

    buttonBarItemActive: {
        backgroundColor: '#00b58c',

    },
    mobileButtonBarItem: {
        textDecoration: 'none',

    },
    mobileButtonBarItemActive: {
        backgroundColor: '#00b58c',
    },
    shoppingCart: {
        marginRight: '10px'
    }
}))

@inject('userStore', 'cartStore')
@observer
class AppBarCollapse extends Component<IProps, IState> {

    get injected () {
        return this.props as IInjectedProps
    }

    // обработчик события "клик по иконе корзины" - переключатель видимости корзины
    handleCartIconClick = (e: React.MouseEvent) => {
        if (this.injected.cartStore.cartShown) {
            this.injected.cartStore.setCartVisibility(false)
        } else {
            this.injected.cartStore.setCartVisibility(true)
        }
    }

    render () {
        const { classes } = this.injected
        const { routes } = this.props
        return (
            <div className={classes.root}>
                {/* экземпляр мобильного меню */}
                <ButtonAppBarCollapse>
                    {
                        // передача значения компоненту-потомку ButtonAppBarCollapse,
                        // которое будет им автоматически получено
                        // в стандартный внешний параметр children -
                        // - представление списка пунктов меню
                        routes.map(route => {
                            if (!/^Dashboard[A-z]+$/.test(route.name)) {
                                return <MenuItem key={route.path}>
                                    <NavLink
                                        to={route.path}
                                        className={classes.mobileButtonBarItem}
                                        activeClassName={classes.mobileButtonBarItemActive}
                                        exact>
                                        {route.name}
                                    </NavLink>
                                </MenuItem>
                            } else {
                                return ''
                            }

                        })}
                </ButtonAppBarCollapse>
                {/* настольное меню */}
                <div className={classes.buttonBar} id="appbar-collapse">
                    {routes.map(route => {
                        if (!/^Dashboard[A-z]+$/.test(route.name)) {
                            return <NavLink
                                key={route.path}
                                to={route.path}
                                // можно указать в двойных кавычках имя
                                // класса стиля, описанного в css
                                className={classes.buttonBarItem}
                                // , а в данном случае создается экранирование
                                // фигурными скобками, и внутри него
                                // указывается имя класса стиля,
                                // определенного в константе styles
                                activeClassName={classes.buttonBarItemActive}
                                exact>
                                {route.name}
                            </NavLink>
                        } else {
                            return ''
                        }
                    }
                    )}
                </div>
                <div className={classes.shoppingCart} style={{display: this.injected.userStore.user ? 'inline' : 'none' }}>
                    <ShoppingCartIcon
                        onClick={this.handleCartIconClick}
                    /> {this.injected.cartStore.cartItemsCount} ({this.injected.cartStore.cartItemsTotalPrice}) грн.
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AppBarCollapse)