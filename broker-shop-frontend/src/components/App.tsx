import React from 'react'
import {Router, Route} from 'react-router-dom'
import {CommonStore} from '../stores/CommonStore'
import {RouterStore} from '../stores/RouterStore'
import {UserStore} from '../stores/UserStore'
import {CartStore} from '../stores/CartStore'
import {
    NavLink
} from 'react-router-dom'

import {
    Close as CloseIcon,
    ExposurePlus1 as ExposurePlus1Icon,
    ExposureNeg1 as ExposureNeg1Icon,
    Clear as ClearIcon
} from '@material-ui/icons'
import Fab from '@material-ui/core/Fab';
import {inject, observer} from "mobx-react"
import {Alert, Color} from "@material-ui/lab"
import {
    AppBar, Button, CircularProgress,
    Container,
    createStyles, Grid, IconButton,
    Modal, Snackbar,
    Theme,
    Toolbar,
    withStyles,
    WithStyles
} from "@material-ui/core"
import history from "../history"
import {CSSTransition} from "react-transition-group";
import AppBarCollapse from "./common/AppBarCollapse";
import Footer from "./common/Footer";
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPhone, faMapMarkerAlt, faEnvelope,} from '@fortawesome/free-solid-svg-icons'
import Header from "./common/Header";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ModalDialog from "./common/ModalDialog";
import {ProductStore} from "../stores/ProductStore";
import backImg from '../images/back2.png';
import {url} from "inspector";
import imageFooter from "../images/footer.jpg";

library.add(faInstagram, faPhone, faMapMarkerAlt, faEnvelope)

interface IProps {
    // Перечисляются все внешние параметры (свойства)
    // переданные явно из оъекта родительского компонента
}
interface IInjectedProps extends IProps, WithStyles<typeof styles> {
    // Перечисляются все внешние параметры (свойства)
    // переданные не явно (например, внедрением зависимости при помощи декораторов)
    commonStore: CommonStore,
    routerStore: RouterStore,
    userStore: UserStore,
    cartStore: CartStore,
    productStore: ProductStore,
}
interface IState {
    snackBarVisibility: boolean,
    snackBarText: string,
    snackBarSeverity: Color
    openMenu: boolean
}

interface PropsScrollTop {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootScrollTop: {
            '& > *': {
                //backgroundColor: 'rgba(3,155,230,.6)',
                backgroundColor: '#039be6',
                opacity: '.6',
            },
            '& > *:hover': {
                backgroundColor: '#039be6',
            },
            zIndex: 999,
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

function ScrollTop(props: PropsScrollTop) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.rootScrollTop}>
                {children}
            </div>
        </Zoom>
    );
}

const styles = (theme: Theme) => createStyles({
    // объявление пользовательского класса стиля
    // (для корневого компонента разметки текущего компонента)
    root: {
        zIndex: 10,
        background: `url(${backImg}) no-repeat center 50px;`,
        // атрибут класса стиля
        // flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },

    main: {
        flex: '1 0 auto'
    },
    container: {
        padding: '0',
        maxWidth: '970px',
        '& .page' : {
            position: 'static'
        }
    },
    navBar: {
        color: '#424242',
        backgroundColor: '#fff',
        width: '100%',
    },
    toolBar: {
        display: 'flex',
    },
    title: {
        // flexGrow: 1,
        marginLeft: '10px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    modalContent: {

        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    cartModalContent: {
        width: '600px',
        maxHeight: '100vh',
        overflowY: 'scroll',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        // borderHistory: '1px solid #000',
        boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 4, 3),
    },
    closeButton: {
        cursor:'pointer',
        float:'right',
        marginTop: '-80px',
        marginRight: '-25px',
    },
    page: {
    },
    cakeIcon: {
        border: '1px dashed #a7a7a7',
        // backgroundColor : 'rgba(255,255,255,0.4)',
        borderRadius: '50%',

        width: '48px',
        height: '48px',
        position: 'relative',
        //top: 8,
        //left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    mainTitle: {
        alignItems: 'center',
        // fontFamily: "'Source Sans Pro', sans-serif",
        // fontFamily: "'Montserrat', sans-serif",
        flexGrow: 1,
        marginLeft: '5px',
        fontWeight: 700,
        fontSize: 'xx-large',
    },
    LogoTitleContainer: {
        '& *': {
            textDecoration: 'none',
            display: 'flex',
            color: '#424242',
            // flexGrow: 1,
        },
        flexGrow: 1,
    },
    buttonBuy: {
        '&:hover':{
            backgroundColor: '#009900',
            opacity: '.8',
        },
        color: "white",
        backgroundColor: '#009900',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    noNumber: {
        display: 'inline',
        color: "red",
    },
    buttonRemove: {
        backgroundColor: 'red',
        position: 'absolute',
        right: '15px',
        top: '-36px',
    },
    ul : {

    },
    item: {
        marginTop: '36px',
        position: 'relative',
    },
    imageProduct: {
      width: '300px',
    },
    titleCart: {
      margin: '10px 0',
    },
})

@inject('commonStore', 'routerStore', 'userStore', 'cartStore', 'productStore')
@observer
class App extends React.Component<IProps, IState> {
    // Геттер свойства, который подводит фактически полученные props
    // под интерфейс неявно полученных props
    get injected () {
        return this.props as IInjectedProps
    }


    constructor(props: IProps) {
        super(props)
        this.state = {
            snackBarVisibility: false,
            snackBarText: '',
            snackBarSeverity: 'success',
            openMenu: false,
        }
        // history.listen((location, action) => {
        //     console.log(action, location.pathname, location.search)
        //
        // });

    }

    handleClick = () => {
        this.setState({openMenu: !this.state.openMenu})
    };



    handleErrorModalClose = (e: React.KeyboardEvent | React.MouseEvent) => {
        this.injected.commonStore.setError('')
    }



    handleCartItemPlus = (e: React.MouseEvent, productId: number) => {
        this.injected.cartStore.addToCart(productId, () => {
            this.setState({snackBarText: '+ один продукт'})
            this.setState({snackBarSeverity: 'success'})
            this.setState({snackBarVisibility: true})
        })
    }

    handleCartItemNeg = (e: React.MouseEvent, productId: number) => {
        this.injected.cartStore.subtractFromCart(productId, () => {
            this.setState({snackBarText: '- один продукт'})
            this.setState({snackBarSeverity: 'success'})
            this.setState({snackBarVisibility: true})
        })
    }

    handleCartItemRemove = (e: React.MouseEvent, productId: number) => {
        this.injected.cartStore.deleteAllFromCart(productId, () => {
            this.setState({snackBarText: 'Товар удален'})
            this.setState({snackBarSeverity: 'success'})
            this.setState({snackBarVisibility: true})
        })
    }

    handleCartModalClose = (e: React.MouseEvent) => {
        this.injected.cartStore.setCartVisibility(false)
    }

    handleSnackBarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackBarVisibility: false})
        this.setState({snackBarSeverity: 'success'})
    }


    componentDidMount() {
        this.injected.userStore.check()
        this.injected.productStore.fetchProducts()
    }

    handlerClickPurchase = (event?: React.MouseEvent) => {
        this.injected.cartStore.sendMail()
        this.injected.cartStore.deleteFullFromCart(this.callbackDeleteFullFromCart) // TODO: очистить корзину полностью
    }

    callbackDeleteFullFromCart = () => {
        this.setState({snackBarText: 'Заказ отправлен. С вами свяжутся.'})
        this.setState({snackBarSeverity: 'success'})
        this.setState({snackBarVisibility: true})
    }

    render() {
    const {classes, routerStore} = this.injected
    const progress = (this.injected.commonStore.loading ? <CircularProgress/> : '')

    // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        return (
        <Router history={history}>
            <div className={classes.root}>
                <div id="back-to-top-anchor"/>
                <Header/>
                {/* панель приложения, "приклееная" к верхней части страницы */}
                <AppBar position='sticky' className={classes.navBar}>
                    <Toolbar className={classes.toolBar}>
                        <div className={classes.LogoTitleContainer}>
                            <NavLink to="/"
                                     exact
                            >
                                    <img className={classes.cakeIcon} src="/images/icon.png" alt="cake logo"/>
                                <div className={classes.mainTitle}>Тортодел</div>
                            </NavLink>
                        </div>
                        {/* панель навигации */}
                        <AppBarCollapse routes={routerStore.routes} />
                    </Toolbar>
                </AppBar>
                {/* область для вывода экземпляра текущего раздела веб-приложения */}
                <main className={classes.main}>
                    <Container maxWidth="sm" className={classes.container}>
                        {this.injected.routerStore.routes.map(({ path, Component }) => (
                            <Route key={path} exact path={path}>
                                {({ match }) => (
                                    <CSSTransition
                                        in={match != null}
                                        timeout={0}
                                        classNames='page'
                                        unmountOnExit
                                    >
                                        <div className='page'>
                                            <Component />
                                        </div>
                                    </CSSTransition>
                                )}
                            </Route>
                        ))}
                    </Container>
                </main>
                <footer /*className={classes.footer}*/>
                    <Footer/>
                </footer>
                <ScrollTop {...Window}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
                {/* Окно, которое появляется только при наличии содержательного значения
                в наблюдаемом свойстве error */}
                {/*<Modal*/}
                {/*    // Неявное приведение типов из String в Boolean*/}
                {/*    open={ !!this.injected.commonStore.error }*/}
                {/*    onClose={ this.handleErrorModalClose }*/}
                {/*    aria-labelledby="simple-modal-title"*/}
                {/*    aria-describedby="simple-modal-description"*/}
                {/*    className={classes.modal}*/}
                {/*>*/}
                {/*    <div id='errorBlock' className={classes.modalContent}>*/}
                {/*        {this.injected.commonStore.error}*/}
                {/*    </div>*/}
                {/*</Modal>*/}

                <ModalDialog/>


                {/*КОРЗИНА*/}
                <Modal
                    open={ this.injected.cartStore.cartShown }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                >
                    <div className={classes.cartModalContent}>
                        <div id="simple-modal-title">
                            <h2>Корзина</h2>
                            <IconButton
                                onClick={this.handleCartModalClose}
                                className={classes.closeButton}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <div id="simple-modal-description">
                            {this.injected.cartStore?.cartItemsCount as number > 0 ?
                                (<div>
                                {this.injected.cartStore.cartItems.map((item) => {
                                    return(
                                        <div className={classes.item}>
                                            <Button
                                                className={classes.buttonRemove}
                                                onClick={(e) => {
                                                    this.handleCartItemRemove(e, Number(item.productId))
                                                }}>
                                                <ClearIcon/>
                                            </Button>
                                            <img
                                                className={classes.imageProduct}
                                                src={this.injected.productStore?.products.find((product) => product.id === item.productId)?.image}
                                                alt={'image product'}
                                            />
                                            <h4 className={classes.titleCart}>{this.injected.productStore?.products.find((product) => product.id === item.productId)?.title}</h4>
                                            <ul className={classes.ul}>

                                                <li>Вес: {item?.weight}кг</li>
                                                <li>Наполнение: {item?.filling}</li>
                                                <li>Фигурка: {item?.sculpture? 'Да' : 'Нет'}</li>
                                                <li>Надпись: {item?.title ? item?.title : 'Нет'}</li>
                                                <li>Пожелание к заказу: {item?.description ? item?.description : 'Нет'}</li>
                                                <li>Телефон: {item?.phoneNumber ? item?.phoneNumber : <div className={classes.noNumber}>не указан</div>}</li>
                                                <li>Сумма: {item?.price}грн.</li>
                                            </ul>
                                            <div>-----------</div>
                                        </div>
                                    )
                                })}
                            </div>) : <div id='CartEmptyText'>Корзина пуста</div>}

                            {/*{this.injected.cartStore.cartItemsCount > 0 ? (*/}
                            {/*    <table className="table">*/}
                            {/*        <thead>*/}
                            {/*        <tr>*/}
                            {/*            <th>вес</th>*/}
                            {/*            <th>фигурка</th>*/}
                            {/*            <th>надпись</th>*/}
                            {/*            <th>описание</th>*/}
                            {/*            <th>цена</th>*/}
                            {/*            <th>количество</th>*/}

                            {/*            /!*public Long id;*!/*/}
                            {/*            /!*public Long productId;*!/*/}
                            {/*            /!*public Double weight;*!/*/}
                            {/*            /!*public String filling;*!/*/}
                            {/*            /!*public Boolean sculpture;*!/*/}
                            {/*            /!*public String title;*!/*/}
                            {/*            /!*public String description;*!/*/}
                            {/*            /!*public BigDecimal price;*!/*/}
                            {/*            /!*public Integer quantity;*!/*/}
                            {/*        </tr>*/}
                            {/*        </thead>*/}
                            {/*        <tbody>*/}
                            {/*        {this.injected.cartStore.cartItems.map(item => {*/}
                            {/*            return (*/}
                            {/*                <tr key={item.productId}>*/}
                            {/*                    <th scope="row">{item.productId}</th>*/}
                            {/*                    <td>{item.sculpture}</td>*/}
                            {/*                    <td>{item.title}</td>*/}
                            {/*                    <td>{item.description}</td>*/}
                            {/*                    <td>{item.price}</td>*/}
                            {/*                    <td>{item.quantity}</td>*/}
                            {/*                    <td>{(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>*/}
                            {/*                    /!*<td>*!/*/}
                            {/*                    /!*    <Grid container spacing={1}>*!/*/}
                            {/*                    /!*        <Grid item xs={3} >*!/*/}
                            {/*                    /!*            <Button*!/*/}
                            {/*                    /!*                onClick={(e) => {*!/*/}
                            {/*                    /!*                    this.handleCartItemPlus(e, Number(item.productId))*!/*/}
                            {/*                    /!*                }}>*!/*/}
                            {/*                    /!*                <ExposurePlus1Icon/>*!/*/}
                            {/*                    /!*            </Button>*!/*/}
                            {/*                    /!*        </Grid>*!/*/}
                            {/*                    /!*        <Grid item xs={3} >*!/*/}
                            {/*                    /!*            <Button*!/*/}
                            {/*                    /!*                onClick={(e) => {*!/*/}
                            {/*                    /!*                    this.handleCartItemNeg(e, Number(item.productId))*!/*/}
                            {/*                    /!*                }}>*!/*/}
                            {/*                    /!*                <ExposureNeg1Icon/>*!/*/}
                            {/*                    /!*            </Button>*!/*/}
                            {/*                    /!*        </Grid>*!/*/}
                            {/*                    /!*        <Grid item xs={3} >*!/*/}
                            {/*                    /!*            <Button*!/*/}
                            {/*                    /!*                onClick={(e) => {*!/*/}
                            {/*                    /!*                    this.handleCartItemRemove(e, Number(item.productId))*!/*/}
                            {/*                    /!*                }}>*!/*/}
                            {/*                    /!*                <ClearIcon/>*!/*/}
                            {/*                    /!*            </Button>*!/*/}
                            {/*                    /!*        </Grid>*!/*/}
                            {/*                    /!*    </Grid>*!/*/}
                            {/*                    /!*</td>*!/*/}
                            {/*                </tr>*/}
                            {/*            )*/}
                            {/*        })}*/}
                            {/*        </tbody>*/}
                            {/*    </table>*/}
                            {/*) : (*/}
                            {/*    <span>Ваша корзина пуста</span>*/}
                            {/*)}*/}
                            {/* Обычная html-гиперссылка для того, чтобы запрос на сервер
                             был выполнен синхронно, и ответ (перенаправление) ожидал не
                              код фронтенда (функция fetch), а сам браузер */}
                            {/*<a href={`${this.injected.commonStore.basename}/cart/pay`}>Purchase</a>*/}
                            <Button
                            disabled={!(this.injected.cartStore?.cartItemsCount as number > 0)}
                            className={classes.buttonBuy} onClick={this.handlerClickPurchase}>ЗАКАЗАТЬ</Button>
                        </div>
                    </div>
                </Modal>
                <Snackbar
                    open={this.state.snackBarVisibility}
                    autoHideDuration={6000} onClose={this.handleSnackBarClose}>
                    <Alert onClose={this.handleSnackBarClose} severity={this.state.snackBarSeverity}>
                        {this.state.snackBarText}
                    </Alert>
                </Snackbar>
                {progress}
            </div>
        </Router>
    )
  }
}
export default withStyles(styles)(App)
