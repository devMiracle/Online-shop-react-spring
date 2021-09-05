import React from 'react'
import {
    Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardMedia, CircularProgress,
    createStyles,
    Grid, Snackbar,
    Theme, Typography,
    WithStyles,
    withStyles
} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {ProductStore} from "../../stores/ProductStore";
import {CategoryStore} from "../../stores/CategoryStore";
import history from "../../history";
import {CommonStore} from "../../stores/CommonStore";
import {CartStore} from "../../stores/CartStore";
import {Alert} from "@material-ui/lab";
import {UserStore} from "../../stores/UserStore";
import History from "../../history";

interface IPreviousSearch {
    searchString: string,
    orderBy: string,
    sortingDirection: string
}

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    productStore: ProductStore,
    categoryStore: CategoryStore,
    commonStore: CommonStore,
    cartStore: CartStore,
    userStore: UserStore
}

interface IState {
    prevSearch: IPreviousSearch,
    snackBarVisibility: boolean,
    snackBarText: string,
}

const styles = (theme: Theme) => createStyles({
    root: {

    },
    productCard: {
        margin: '15px 0',
        width: 300,
        border: '1px solid #f3f3f3',
        boxShadow: '0 0 2px #f3f3f3 ',
        textAlign: 'center',
    },
    productCardImage: {
        height: 300
    },
    displayNone: {
        display: 'none',
    },
    buttonAddToCart: {
        fontFamily: "'Comfortaa', cursive",
        '&:hover': {
            backgroundColor: 'white',
            color: '#039be6',
            border: '1px solid #039be6',
        },
        border: '1px solid white',
        backgroundColor: '#039be6',
        color: 'white',
    },
    CardActions: {
        display: 'flex',
        justifyContent: 'center',
    },
    buttonUnauthorized: {
        display: 'inline-flex',
        fontFamily: "'Comfortaa', cursive",
        '&:hover': {
            // backgroundColor: 'white',
            color: '#039be6',
            // border: '1px solid #a6a6a6',
            cursor: 'pointer',
        },
        // border: '1px solid white',
        // backgroundColor: '#a6a6a6',
        color: '#a6a6a6',
    },
    titleText: {
        fontFamily: "'Comfortaa', cursive",
        fontSize: 'large',
    },
    cardAct: {
        border: "none",
        borderRadius: 0,
    },
    'MuiPaper-rounded': {
        borderRadius: '0',
    },
    progressBar: {
        width: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceText: {
      color: '#a7a7a7',
    },
})


@inject('productStore', 'categoryStore', 'commonStore', 'cartStore', 'userStore')
@observer
class Items extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            snackBarVisibility: false,
            snackBarText: '',
            prevSearch: {
                searchString: '',
                orderBy: '',
                sortingDirection: ''
            },
        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {
        const windowUrl = window.location.search
        const params = new URLSearchParams(windowUrl)
        const searchString: string = params.get('search') || ''
        if (searchString) {
            const triggerSearchString = searchString.indexOf('null')
            if (triggerSearchString) {
                this.injected.productStore.fetchProductPriceBounds()
                this.injected.productStore.fetchProductQuantityBounds()
            }
            //this.injected.productStore.setFilterDataSearchString(searchString)
            if (searchString.includes(';category:[')) {
                const categoryId = searchString.substr(searchString.indexOf(';category:[') + 11,1)
                 this.injected.productStore.setCategoryId(parseInt(categoryId))
            } else {
                this.injected.productStore.fetchFilteredProducts()
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>) {
        let elements = document.getElementsByClassName('MuiPaper-rounded')
        Array.from(elements).forEach((el) => el.classList.remove('MuiPaper-rounded', 'MuiPaper-elevation1'));

        // если работа фильтра в данный момент не выполняется - передаем
        // параметры из адресной строки в состояние фильра в локальном хранилище

        if (this.injected.productStore.allowFetchFilteredProducts) {
            // считывание цепочки параметров из адресной строки
            const windowUrl = window.location.search
            // вызов конструктора парсера параметров адресной строки
            const params = new URLSearchParams(windowUrl)
            // для тех параметров, которые отсутствуют в адресной строке,
            // устанавливаем значения - пустые строки
            const searchString: string = params.get('search') || ''
            const orderBy = params.get('orderBy') || ''
            const sortingDirection = params.get('sortingDirection') || ''
            // если изменилась хотя бы одна составляющая поиска/сортироки в адресной строке
            // (выясняем это сравнением всех трех составляющих поиска/сортировки,
            // установленных в состояние компонента в прошлый раз
            // с новыми значениями, только что полученными из адресной строки)
            if (searchString !== this.state.prevSearch.searchString
                || orderBy !== this.state.prevSearch.orderBy
                || sortingDirection !== this.state.prevSearch.sortingDirection
            ) {
                // новое состояние фильтра (поиска) и сортировки записывается на место старого
                this.setState({prevSearch: {
                        searchString: searchString,
                        orderBy: orderBy,
                        sortingDirection: sortingDirection
                    }})
                // передача строки поиска в хранилище для обработки
                this.injected.productStore.setFilterDataSearchString(searchString)
                if (orderBy) {
                    this.injected.productStore.setOrderBy(orderBy)
                }
                if (sortingDirection) {
                    this.injected.productStore.setSortingDirection(sortingDirection)
                }
                // после заполнения данных поиска/сортировки в хранилище MobX
                // запускаем процесс запроса фильтрованных/сортированных данных о товарах
                this.injected.productStore.fetchFilteredProducts()
                // разрешаем отправку следующих запросов
                this.injected.productStore.setAllowFetchFilteredProducts(false)
            }
        }

    }

    componentWillUnmount() {
        // this.injected.productStore.clearAllCategoryId()
    }

    handleAddToCart = (e: React.MouseEvent, productId: number) => {
        this.injected.cartStore.addToCart(productId, () => {
            this.setState({snackBarText: 'Товар добавлен в корзину'})
            this.setState({snackBarVisibility: true})
        })
    }

    handleSnackBarClose = (event?: React.SyntheticEvent, reason?: string) => {
        // если причина появления события закрытия уведомления -
        // это клик вне окошка уведомления -
        // - не реагируем, чтобы пользователь успевал прочесть текст уведомления
        if (reason === 'clickaway') {
            return;

        }
        this.setState({snackBarVisibility: false})
    }

    handlerClickOnCardActionArea = (event: React.MouseEvent, id: number) => {
        this.injected.productStore.fetchProductById(id)
        History.push(`item?id=${id}`)
    }


    render () {

        const { classes } = this.injected
        const { products } = this.injected.productStore
        const { loading } = this.injected.commonStore
        // eslint-disable-next-line
        const { categories } = this.injected.productStore // DONT DELETE
        const { user } = this.injected.userStore


        // <div className={classes.displayNone}>{categories}</div>

        {/*loading*/}
               if (loading) {
                   return(
                       <div className={classes.progressBar}>
                           <CircularProgress disableShrink />
                       </div>
                   )
               } else {
                   return(<div className={classes.root}>

                       {products.length > 0 ?

                           <Grid
                               container
                               direction={'row'}
                               //justify={'center'}
                               //alignItems={'center'}
                           >
                               {products.map(product => {
                                   return (
                                       <Grid
                                           key={'c' + product.id}
                                           container
                                           direction={'row'}
                                           justify={'center'}
                                           alignItems={'center'}
                                           item
                                           xs={12}
                                           sm={6}
                                           md={4}
                                           lg={4}
                                           xl={4}
                                           spacing={0}
                                       >
                                           <Card className={classes.productCard}>
                                               <CardActionArea
                                                   className={classes.cardAct}
                                                   onClick={(e) => this.handlerClickOnCardActionArea(e, product.id)}

                                               >
                                                   <CardMedia
                                                       className={classes.productCardImage}
                                                       image={product.image}
                                                       title={product.title}
                                                   />
                                                   <CardContent>
                                                       <div className={classes.titleText}>
                                                           <div>{product.title}</div>
                                                           <div className={classes.priceText}>Цена за 1 кг:&nbsp;{product.price}грн</div>
                                                       </div>
                                                       {/*<strong>{product.price} грн.</strong>*/}

                                                       {/*<Typography variant="body2" color="textSecondary" component="p">*/}
                                                       {/*    {product.description}*/}
                                                       {/*</Typography>*/}
                                                   </CardContent>
                                               </CardActionArea>
                                               {/*<CardActions className={classes.CardActions}>*/}
                                               {/*    /!*<Button size="small" color="primary">*/}
                                               {/*    Share*/}
                                               {/*</Button>*!/*/}
                                               {/*    {user ? <Button*/}
                                               {/*        className={classes.buttonAddToCart}*/}
                                               {/*        size="small"*/}
                                               {/*        onClick={(e) => {*/}
                                               {/*            this.handleAddToCart(e, product.id)*/}
                                               {/*        }}*/}
                                               {/*        // style={{display: this.injected.userStore.user ? 'inline' : 'none' }}*/}
                                               {/*    >*/}
                                               {/*        Добавить в корзину*/}
                                               {/*        /!*<Button className={classes.buttonAddToCart}>Добавить в корзину</Button>*!/*/}
                                               {/*    </Button> :*/}
                                               {/*    <div>*/}
                                               {/*        <div>*/}
                                               {/*            Заказывать могут только авторизованые пользователи.*/}
                                               {/*        </div>*/}
                                               {/*        <div*/}
                                               {/*            className={classes.buttonUnauthorized}*/}
                                               {/*            onClick={(e) => {*/}
                                               {/*                history.push('/signin')*/}
                                               {/*            }}*/}
                                               {/*            // style={{display: this.injected.userStore.user ? 'inline' : 'none' }}*/}
                                               {/*        >*/}
                                               {/*            <div>Вход</div>*/}
                                               {/*            /!*<Button className={classes.buttonAddToCart}>Добавить в корзину</Button>*!/*/}
                                               {/*        </div>*/}
                                               {/*        {' / '}*/}
                                               {/*        <div*/}
                                               {/*            className={classes.buttonUnauthorized}*/}
                                               {/*            onClick={(e) => {*/}
                                               {/*                history.push('/signup')*/}
                                               {/*            }}*/}
                                               {/*            // style={{display: this.injected.userStore.user ? 'inline' : 'none' }}*/}
                                               {/*        >*/}
                                               {/*            <div>Регистрация</div>*/}
                                               {/*            /!*<Button className={classes.buttonAddToCart}>Добавить в корзину</Button>*!/*/}
                                               {/*        </div>*/}
                                               {/*    </div>}*/}

                                               {/*</CardActions>*/}
                                           </Card>
                                       </Grid>
                                   )
                               })}
                           </Grid>
                           : <div>пусто</div>
                       }

                       <Snackbar
                           open={this.state.snackBarVisibility}
                           autoHideDuration={6000} onClose={this.handleSnackBarClose}>
                           <Alert onClose={this.handleSnackBarClose} severity="success">
                               {this.state.snackBarText}
                           </Alert>
                       </Snackbar>
                   </div>)
               }
    }
}

export default withStyles(styles)(Items)