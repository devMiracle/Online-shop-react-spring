import React from 'react'
import {Router, Route} from 'react-router-dom'
import {CommonStore} from '../stores/CommonStore'
import {RouterStore} from '../stores/RouterStore'
import {UserStore} from '../stores/UserStore'
import {CartStore} from '../stores/CartStore'

import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {
    Close as CloseIcon,
    ExposurePlus1 as ExposurePlus1Icon,
    ExposureNeg1 as ExposureNeg1Icon,
    Clear as ClearIcon, StarBorder
} from '@material-ui/icons'

import {inject, observer} from "mobx-react"
import {Alert, Color} from "@material-ui/lab"
import {
    AppBar, Button, CircularProgress, Collapse,
    Container,
    createStyles, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText,
    Modal, Snackbar,
    Theme,
    Toolbar,
    Typography,
    withStyles,
    WithStyles
} from "@material-ui/core"
import CakeIcon from '@material-ui/icons/Cake';
import history from "../history"
import {CSSTransition} from "react-transition-group";
import AppBarCollapse from "./common/AppBarCollapse";
import Footer from "./common/Footer";


import {library} from '@fortawesome/fontawesome-svg-core'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPhone, faMapMarkerAlt, faEnvelope,} from '@fortawesome/free-solid-svg-icons'

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
    cartStore: CartStore
}
interface IState {
    snackBarVisibility: boolean,
    snackBarText: string,
    snackBarSeverity: Color
    openMenu: boolean
}
const styles = (theme: Theme) => createStyles({
    // объявление пользовательского класса стиля
    // (для корневого компонента разметки текущего компонента)
    root: {
        // атрибут класса стиля
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    header: {
        backgroundColor: '#fcf7f1',
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
    },
    toolBar: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
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
        backgroundColor: theme.palette.background.paper,
        borderHistory: '2px solid #000',
        boxShadow: theme.shadows[5],
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
        border: '1px solid white',
        backgroundColor : 'rgba(255,255,255,0.4)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
})

@inject('commonStore', 'routerStore', 'userStore', 'cartStore')
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

            openMenu: false
        }
    }

    handleClick = () => {
        this.setState({openMenu: !this.state.openMenu})
    };



    handleErrorModalClose = (e: React.KeyboardEvent | React.MouseEvent) => {
        this.injected.commonStore.setError('')
    }



    handleCartItemPlus = (e: React.MouseEvent, productId: number) => {
        this.injected.cartStore.addToCart(productId, () => {
            this.setState({snackBarText: 'One product added to the cart'})
            this.setState({snackBarSeverity: 'success'})
            this.setState({snackBarVisibility: true})
        })
    }

    handleCartItemNeg = (e: React.MouseEvent, productId: number) => {
        this.injected.cartStore.subtractFromCart(productId, () => {
            this.setState({snackBarText: 'One product was subtracted from the cart'})
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
    }

    render() {
    const {classes, routerStore} = this.injected
    const progress = (this.injected.commonStore.loading ? <CircularProgress/> : '')
    return (
        <Router history={history}>
            <div className={classes.root}>
                <div className={classes.header}>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                </div>
                {/* панель приложения, "приклееная" к верхней части страницы */}
                <AppBar position='sticky' className={classes.navBar}>
                    <Toolbar className={classes.toolBar}>
                        <div className={classes.cakeIcon}>
                            <CakeIcon fontSize={'large'} />
                        </div>
                        <Typography variant='h6' className={classes.title}>
                            Тортодельня
                        </Typography>
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
                {/* Окно, которое появляется только при наличии содержательного значения
                в наблюдаемом свойстве error */}
                <Modal
                    // Неявное приведение типов из String в Boolean
                    open={ !!this.injected.commonStore.error }
                    onClose={ this.handleErrorModalClose }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                >
                    <div id='errorBlock' className={classes.modalContent}>
                        {this.injected.commonStore.error}
                    </div>
                </Modal>
                <Modal
                    open={ this.injected.cartStore.cartShown }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                >
                    <div className={classes.cartModalContent}>
                        <div id="simple-modal-title">
                            <h2>Shopping Cart</h2>
                            <IconButton
                                onClick={this.handleCartModalClose}
                                className={classes.closeButton}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <div id="simple-modal-description">
                            {this.injected.cartStore.cartItemsCount > 0 ? (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>price</th>
                                        <th>quantity</th>
                                        <th>total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.injected.cartStore.cartItems.map(item => {
                                        return (
                                            <tr key={item.productId}>
                                                <th scope="row">{item.name}</th>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>{(item.price * item.quantity).toFixed(2)}</td>
                                                <td>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={3} >
                                                            <Button
                                                                onClick={(e) => {
                                                                    this.handleCartItemPlus(e, item.productId)
                                                                }}>
                                                                <ExposurePlus1Icon/>
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={3} >
                                                            <Button
                                                                onClick={(e) => {
                                                                    this.handleCartItemNeg(e, item.productId)
                                                                }}>
                                                                <ExposureNeg1Icon/>
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={3} >
                                                            <Button
                                                                onClick={(e) => {
                                                                    // this.handleCartItemRemove(e, item.productId)
                                                                }}>
                                                                <ClearIcon/>
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            ) : (
                                <span>Your cart is empty</span>
                            )}
                            {/* Обычная html-гиперссылка для того, чтобы запрос на сервер
                             был выполнен синхронно, и ответ (перенаправление) ожидал не
                              код фронтенда (функция fetch), а сам браузер */}
                            {/*<a href={`${this.injected.commonStore.basename}/cart/pay`}>Purchase</a>*/}
                            <br/>КУПИТЬ
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
