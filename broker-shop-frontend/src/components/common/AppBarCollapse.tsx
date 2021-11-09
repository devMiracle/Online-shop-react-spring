import React, {Component} from "react"
import {
    Accordion,
    AccordionDetails, AccordionSummary,
    Collapse,
    createStyles,
    List,
    ListItem,
    ListItemText,
    MenuItem, Typography
} from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"
import ButtonAppBarCollapse from "./ButtonAppBarCollapse"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Box from '@material-ui/core/Box';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import {
    NavLink
} from 'react-router-dom'
import {
    ExpandLess, ExpandMore,
    ShoppingCart as ShoppingCartIcon
} from "@material-ui/icons"
import {inject, observer} from "mobx-react"
import {UserStore} from '../../stores/UserStore'
import {CartStore} from '../../stores/CartStore'
import {CategoryStore} from '../../stores/CategoryStore'
import RouteModel from "../../models/RouteModel"
import CategoryModel from "../../models/CategoryModel";
import {ProductStore} from "../../stores/ProductStore";
import {CommonStore} from "../../stores/CommonStore";
import history from "../../history";

interface IProps {
    routes: Array<RouteModel>
}

interface IInjectedProps extends IProps, WithStyles<typeof styles> {
    userStore: UserStore
    cartStore: CartStore
    categoryStore: CategoryStore,
    productStore: ProductStore,
    commonStore: CommonStore,
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
        cursor: 'pointer',
        color: '#a6a6a6',
        textDecoration: 'none',
        textTransform: 'uppercase',
        // fontFamily: "'Comfortaa', cursive",

    },
    mobileButtonBarItemActive: {
        cursor: 'pointer',
        color: '#a6a6a6',
        textTransform: 'uppercase',
        // fontFamily: "'Comfortaa', cursive",
    },
    shoppingCart: {
        // marginRight: '10px',
        // position: 'absolute',
        // right: '0',
        // top: '70px',
        textAlign: 'center',
    },
    nested: {
        cursor: 'pointer',
        '& > * > *': {
            // fontFamily: "'Comfortaa', cursive",
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
        cursor: 'pointer',
        '& > * > *': {
            // fontFamily: "'Comfortaa', cursive",
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
    nestedMobile: {
        cursor: 'pointer',
        textTransform: 'uppercase',
        // fontFamily: "'Comfortaa', cursive",
        '& > * > *': {
            // fontFamily: "'Comfortaa', cursive",
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
    nestedActiveMobile: {
        cursor: 'pointer',
        textTransform: 'uppercase',
        // fontFamily: "'Comfortaa', cursive",
        '& > * > *': {
            // fontFamily: "'Comfortaa', cursive",
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
        cursor: 'pointer',
        '& > div': {
            borderBottom: '1px dashed #00a2d0',
        },
    },
    nestedAllItemsMobile: {
        cursor: 'pointer',
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
    nestedAllActiveMobile: {
        color: '#424242',
    },
    heading: {
        // fontFamily: "'Comfortaa', cursive",
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    AccordionDetailsContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
}))

@inject('userStore', 'cartStore', 'categoryStore', 'productStore','commonStore')
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
    // При нажатии на кнопку, снемимает все категории и выставляет новую
    handleClickItemList = (e: React.MouseEvent, categoryId: number) => {
        this.injected.productStore.clearAllCategoryId()
        this.injected.productStore.setFilterDataCategory(categoryId, true)
        this.injected.commonStore.flagButtonOrSearchStringEventToggle(true)
        this.injected.productStore.changeShoppingUrlParams()
        this.setState({openStateMenu: !this.state.openStateMenu})
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    handleClickAllItemList = (e: React.MouseEvent) => {
        this.injected.productStore.clearAllCategoryId()
        this.injected.commonStore.flagButtonOrSearchStringEventToggle(true)
        this.injected.productStore.changeShoppingUrlParams()
        this.setState({openStateMenu: !this.state.openStateMenu})
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    handleClickAway = () => {
        this.setState({openStateMenu: false})
    };

    componentDidMount() {
        this.injected.categoryStore.fetchCategories()
        // const target1 = document.getElementById('targetClick1')
        // const target2 = document.getElementById('targetClick2')
        // const target3 = document.getElementById('targetClick3')
        //
        // document.addEventListener('click', function (e) {
        //     //console.log(e.target)
        //     if (e.target === target1) {
        //         console.log('click1')
        //     }
        //     if (e.target === target2) {
        //         console.log('click2')
        //     }
        //     if (e.target === target3) {
        //         console.log('click3')
        //     }
        // })
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
                                if (route.name.includes('торты')) {
                                    return <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <div className={classes.heading}>{route.name.toUpperCase()}</div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={classes.AccordionDetailsContainer}>
                                                {categories.map((category: CategoryModel) => {
                                                    return <div
                                                        key={category.id}
                                                        className={classes.nestedMobile + ((catId[0] === category.id) ? ' ' + classes.nestedActiveMobile : '')}
                                                        onClick={(e) => {
                                                            this.handleClickItemList(e, category.id)
                                                        }}
                                                    >
                                                        {category.name.toUpperCase()}
                                                    </div>
                                                })}
                                                <div
                                                    id='allCakes'
                                                    className={classes.nestedMobile + ' ' + classes.nestedAllItemsMobile + ((catId.length === 0 && window.location.pathname.includes('/items')) ? ' ' + classes.nestedAllActiveMobile : '')}
                                                    onClick={(e) => {
                                                        this.handleClickAllItemList(e)
                                                    }}
                                                >
                                                    {'Все торты'.toUpperCase()}
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                } else if (route.name.includes('корзина')) {
                                        return <div
                                            key={route.path}
                                            onClick={this.handleCartIconClick} className={classes.buttonBarItem} style={{display: this.injected.userStore.user ? 'flex' : 'none' }}>
                                            <ShoppingCartIcon
                                            /> <div className={classes.shoppingCart}>{this.injected.cartStore.cartItemsCount} ({this.injected.cartStore.cartItemsTotalPrice}) грн.</div>
                                        </div>
                                    } else {
                                        if (!/^Dashboard[A-z]+$/.test(route.name)) {
                                            return <MenuItem key={route.path}>
                                                <NavLink
                                                    key={route.path}
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
                            } else {
                                return ''
                            }
                        })}
                </ButtonAppBarCollapse>
                {/* настольное меню */}
                <div className={classes.buttonBar} id="appbar-collapse">
                    {routes.map(route => {
                        if (route.visible) {
                            if (route.name.includes('торты')) {
                                return <ClickAwayListener
                                    mouseEvent="onMouseDown"
                                    touchEvent="onTouchStart"
                                    onClickAway={this.handleClickAway}>
                                <List
                                    key={route.path}>
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
                                                    return <ListItem
                                                        key={category.id}
                                                        button
                                                        className={classes.nested + ((catId[0] === category.id && window.location.pathname.includes('/items')) ? ' ' + classes.nestedActive : '')}
                                                        onClick={(e) => {
                                                            this.handleClickItemList(e, category.id)
                                                        }}
                                                    >
                                                        <ListItemText primary={
                                                            category.name.toUpperCase()
                                                        } />
                                                    </ListItem>
                                                })}
                                                {/*Кнопка отображания всех товаров сразу*/}
                                                <ListItem
                                                    button
                                                    className={classes.nested + ' ' + classes.nestedAllItems + ((catId.length === 0 && window.location.pathname.includes('/items')) ? ' ' + classes.nestedAllActive : '')}
                                                    onClick={(e) => {
                                                        this.handleClickAllItemList(e)
                                                    }}
                                                    id='allCakes'
                                                >
                                                    <ListItemText primary={
                                                        'Все торты'.toUpperCase()
                                                    } />
                                                </ListItem>
                                            </List>
                                    </Collapse>
                                </List>
                                        </ClickAwayListener>

                            } else if (route.name.includes('корзина')) {
                                return <div
                                    key={route.path}
                                    onClick={this.handleCartIconClick} className={classes.buttonBarItem} style={{display: this.injected.userStore.user ? 'flex' : 'none' }}>
                                    <ShoppingCartIcon
                                    /> <div className={classes.shoppingCart}>{this.injected.cartStore.cartItemsCount} ({this.injected.cartStore.cartItemsTotalPrice}) грн.</div>
                                </div>
                            } else if (!/^Dashboard[A-z]+$/.test(route.name)) {
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