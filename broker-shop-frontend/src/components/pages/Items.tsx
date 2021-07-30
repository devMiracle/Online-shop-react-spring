import React from 'react'
import {
    Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardMedia,
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
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {CartStore} from "../../stores/CartStore";
import {Alert} from "@material-ui/lab";
import {UserStore} from "../../stores/UserStore";

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
        maxWidth: 300
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
        fontFamily: "'Comfortaa', cursive",
        '&:hover': {
            backgroundColor: 'white',
            color: '#a6a6a6',
            border: '1px solid #a6a6a6',
        },
        border: '1px solid white',
        backgroundColor: '#a6a6a6',
        color: 'white',
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
        // сразу после монтирования компонента в виртуальный DOM
        // просим у локального хранилища загрузить
        // список моделей категорий и границы цен и количств товаров
        this.injected.categoryStore.fetchCategories()
        // this.injected.productStore.fetchFilteredProducts()

        this.injected.productStore.fetchProductPriceBounds()
        this.injected.productStore.fetchProductQuantityBounds()
    }

    componentDidUpdate(prevProps: Readonly<IProps>) {
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
        this.injected.productStore.clearAllCategoryId()
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

    render () {
        const { loading } = this.injected.commonStore

        const { classes } = this.injected
        const { products } = this.injected.productStore
        const { categories } = this.injected.productStore
        const { user } = this.injected.userStore

        // <div className={classes.displayNone}>{categories}</div>

            return (



            <div className={classes.root}>

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
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.productCardImage}
                                            image={product.image}
                                            title={product.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {product.title} - <strong>{product.price} грн.</strong>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {product.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className={classes.CardActions}>
                                        {/*<Button size="small" color="primary">
                                        Share
                                    </Button>*/}
                                        {user ? <Button
                                            className={classes.buttonAddToCart}
                                            size="small"
                                            onClick={(e) => {
                                                this.handleAddToCart(e, product.id)
                                            }}
                                            // style={{display: this.injected.userStore.user ? 'inline' : 'none' }}
                                        >
                                            Добавить в корзину
                                            {/*<Button className={classes.buttonAddToCart}>Добавить в корзину</Button>*/}
                                        </Button> : <Button
                                            className={classes.buttonUnauthorized}
                                            size="small"
                                            onClick={(e) => {
                                               history.push('/signin')
                                            }}
                                            // style={{display: this.injected.userStore.user ? 'inline' : 'none' }}
                                        >
                                            На страницу входа
                                            {/*<Button className={classes.buttonAddToCart}>Добавить в корзину</Button>*/}
                                        </Button>}

                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                    : <div>пусто</div>}
                <Snackbar
                    open={this.state.snackBarVisibility}
                    autoHideDuration={6000} onClose={this.handleSnackBarClose}>
                    <Alert onClose={this.handleSnackBarClose} severity="success">
                        {this.state.snackBarText}
                    </Alert>
                </Snackbar>
            </div>
        )

    }
}

export default withStyles(styles)(Items)