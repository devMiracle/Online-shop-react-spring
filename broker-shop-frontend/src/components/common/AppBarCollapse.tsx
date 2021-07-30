import React, {Component} from "react"
import history from "../../history"
import {Collapse, createStyles, List, ListItem, ListItemText, MenuItem} from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"
import ButtonAppBarCollapse from "./ButtonAppBarCollapse"



import {
    NavLink
} from 'react-router-dom'
import {
    ExpandLess, ExpandMore,
    ShoppingCart as ShoppingCartIcon, StarBorder
} from "@material-ui/icons"
import {inject, observer} from "mobx-react"
import {UserStore} from '../../stores/UserStore'
import {CartStore} from '../../stores/CartStore'
import {CategoryStore} from '../../stores/CategoryStore'
import RouteModel from "../../models/RouteModel"
import CategoryModel from "../../models/CategoryModel";
import {ProductStore} from "../../stores/ProductStore";
import Items from "../pages/Items";

interface IProps {
    routes: Array<RouteModel>
}

interface IInjectedProps extends IProps, WithStyles<typeof styles> {
    userStore: UserStore
    cartStore: CartStore
    categoryStore: CategoryStore,
    productStore: ProductStore
}

interface IState {
    openStateMenu: boolean
}

const styles = ((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // position: "absolute",
        // right: 0,
    },
    buttonBar: {
        // если ширина экрана - мобильная или меньше
        [theme.breakpoints.down("sm")]: {
            // скрываем настольную версию пунктов меню навигации и аутентификации
            display: "none"
        },
        // margin: "10px",
        paddingLeft: "16px",
        right: "10px",
        position: "relative",
        width: "100%",
        background: "transparent",
        display: 'flex',
        flexDirection: 'row',
        height: '60px',
    },
    buttonBarItem: {
        '&:hover': {
            color: '#039be6',
        },
        webkitTransition: 'background-color .3s',
        transition: 'background-color .3s',
        fontSize: '1rem',
        color: '#a6a6a6',
        padding: '0 15px 0 0',
        cursor: 'pointer',
        textDecoration: 'none',
        alignSelf: 'center',
        lineHeight: '23px',
    },
    buttonBarItemActive: {
        backgroundColor: '#fff',
        color: '#424242',
        alignSelf: 'center',
        lineHeight: '23px',
    },
    mobileButtonBarItem: {
        textDecoration: 'none',

    },
    mobileButtonBarItemActive: {
        // backgroundColor: '#00b58c',
    },
    shoppingCart: {
        // marginRight: '10px',
        // position: 'absolute',
        // right: '0',
        // top: '70px',
        textAlign: 'center',
    },
    nested: {
        '& > * > *': {
            fontFamily: "'Comfortaa', cursive",
        },
        '&:hover': {
            color: '#039be6',
            background: '#fff',
        },
        // opacity: '.96',
        flexDirection: 'column',
        background: '#fff',
        color: '#a6a6a6',
    },
    nestedActive: {
        '& > * > *': {
            fontFamily: "'Comfortaa', cursive",
        },
        '&:hover': {
            color: '#039be6',
            background: '#fff',
        },
        // opacity: '.96',
        flexDirection: 'column',
        background: '#fff',
        color: '#424242',
    },
    nestedAllItems: {
        '& > div': {
            borderBottom: '1px dashed #00a2d0',
        },
    },
    listItem: {
        '&:hover': {
            color: '#039be6',
            backgroundColor: '#fff',
        },
        justifyContent: 'flex-end',
        width: '200px',
        //alignItems: 'baseline',
        '& > div': {
            //alignItems: 'center',
        },
        paddingTop: '10px',
        paddingBottom: '10px',
        color: '#a6a6a6',
    },
    listItemActive: {
        '&:hover': {
            color: '#039be6',
            backgroundColor: '#fff',
        },
        justifyContent: 'flex-end',
        width: '200px',
        background: '#fff',
        //alignItems: 'baseline',
        paddingTop: '10px',
        paddingBottom: '10px',
        color: '#a6a6a6',
    },
    nestedAllActive: {
        color: '#424242',
    },
}))

@inject('userStore', 'cartStore', 'categoryStore', 'productStore')
@observer
class AppBarCollapse extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            openStateMenu: false
        }
    }

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

    handleClick = () => {
        this.setState({openStateMenu: !this.state.openStateMenu})
    }
    handleClickItemList = (e: React.MouseEvent, categoryId: number) => {
        this.injected.productStore.clearAllCategoryId()
        this.injected.productStore.setFilterDataCategory(categoryId, true)
        this.setState({openStateMenu: !this.state.openStateMenu})
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        // window.scrollTo(0, 0)
    }

    handleClickAllItemList = (e: React.MouseEvent) => {
        this.injected.productStore.clearAllCategoryId()
        // this.injected.productStore.fetchFilteredProducts()
        this.injected.productStore.fetchProductPriceBounds()
        this.injected.productStore.fetchProductQuantityBounds()
        this.setState({openStateMenu: !this.state.openStateMenu})
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    componentDidMount() {
        this.injected.categoryStore.fetchCategories()


    }



    render () {
        const { classes } = this.injected
        const { routes } = this.props
        const { categories } = this.injected.categoryStore
        const catId = this.injected.productStore.categories

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
                            if (route.visible) {
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
                            }
                        })}
                </ButtonAppBarCollapse>
                {/* настольное меню */}
                <div className={classes.buttonBar} id="appbar-collapse">
                    {routes.map(route => {
                        if (route.visible) {
                            if (route.name.includes('торты')) {
                                return <List>
                                    <ListItem
                                        className={this.state.openStateMenu ? classes.listItemActive : classes.listItem}
                                        button onClick={this.handleClick}>
                                        <div>
                                            {route.name.toUpperCase()}
                                        </div>
                                        {this.state.openStateMenu ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.openStateMenu} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                                {categories.map((category: CategoryModel) => {
                                                    return <ListItem button
                                                                     className={classes.nested + ((catId[0] === category.id) ? ' ' + classes.nestedActive : '')}
                                                                     onClick={(e) => {
                                                                         this.handleClickItemList(e, category.id)
                                                                     }}
                                                        >
                                                            <ListItemText primary={
                                                                category.name.toUpperCase()
                                                            } />
                                                        </ListItem>
                                                })}
                                            <ListItem button
                                                      className={classes.nested + ' ' + classes.nestedAllItems + ((catId.length === 0 && window.location.pathname.includes('/items')) ? ' ' + classes.nestedAllActive : '')}
                                                      onClick={(e) => {
                                                          this.handleClickAllItemList(e)
                                                      }}
                                            >
                                                <ListItemText primary={
                                                    'Все торты'.toUpperCase()
                                                } />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                </List>
                            } else if (route.name.includes('корзина')) {
                                return <div onClick={this.handleCartIconClick} className={classes.buttonBarItem} style={{display: this.injected.userStore.user ? 'flex' : 'none' }}>
                                    <ShoppingCartIcon
                                    /> <div className={classes.shoppingCart}>{this.injected.cartStore.cartItemsCount} ({this.injected.cartStore.cartItemsTotalPrice}) грн.</div>
                                </div>
                            } else {
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
                                        {route.name.toUpperCase()}
                                    </NavLink>
                                } else {
                                    return ''
                                }
                            }
                        } else {
                            return ''
                        }
                    }
                    )}
                </div>
                {/*<div className={classes.shoppingCart} style={{display: this.injected.userStore.user ? 'inline' : 'none' }}>*/}
                {/*    <ShoppingCartIcon*/}
                {/*        onClick={this.handleCartIconClick}*/}
                {/*    /> {this.injected.cartStore.cartItemsCount} ({this.injected.cartStore.cartItemsTotalPrice}) грн.*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default withStyles(styles)(AppBarCollapse)