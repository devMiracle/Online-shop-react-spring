import React, {Component} from "react"
import {createStyles, MenuItem} from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"
import ButtonAppBarCollapse from "./ButtonAppBarCollapse"
import {
    NavLink
} from 'react-router-dom'
import {inject, observer} from "mobx-react"
import {UserStore} from '../../stores/UserStore'
import RouteModel from "../../models/RouteModel"

interface IProps {
    routes: Array<RouteModel>
}

interface IInjectedProps extends IProps, WithStyles<typeof styles> {
    userStore: UserStore
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
        webkitTransition: 'background-color .3s',
        transition: 'background-color .3s',
        fontSize: '1rem',
        color: '#fff',
        padding: '15px',
        cursor: 'pointer',
        textDecoration: 'none'
    },
    buttonBarItemActive: {
        backgroundColor: '#ea454b',
    },
    mobileButtonBarItem: {
        textDecoration: 'none',
    },
    mobileButtonBarItemActive: {
        backgroundColor: '#ccc',
    }
}))

@inject('userStore')
@observer
class AppBarCollapse extends Component<IProps, IState> {

    get injected () {
        return this.props as IInjectedProps
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
            </div>
        )
    }
}

export default withStyles(styles)(AppBarCollapse)