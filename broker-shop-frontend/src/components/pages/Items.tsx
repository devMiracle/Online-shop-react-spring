import React from 'react'
import {
    Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardMedia,
    createStyles,
    Grid,
    Theme, Typography,
    WithStyles,
    withStyles
} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {ProductStore} from "../../stores/ProductStore";
import {CategoryStore} from "../../stores/CategoryStore";

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

}

interface IState {
    prevSearch: IPreviousSearch,
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

})


@inject('productStore', 'categoryStore')
@observer
class Items extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
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

        this.injected.productStore.fetchProductPriceBounds()
        this.injected.productStore.fetchProductQuantityBounds()

        // this.injected.productStore.fetchFilteredProducts()
    }

    componentDidUpdate(prevProps: Readonly<IProps>) {
        // если работа фильтра в данный момент не выполняется - передаем
        // параметры из адресной строки в состояние фильра в локальном хранилище
        console.log('1111111')
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

    render () {
        const { classes } = this.injected
        const { products } = this.injected.productStore

        return (
            <div className={classes.root}>
                <h1>Items</h1>

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
                                    <CardActions>
                                        {/*<Button size="small" color="primary">
                                        Share
                                    </Button>*/}
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={(e) => {
                                                // this.handleAddToCart(e, product.id)
                                            }}
                                            // style={{display: this.injected.userStore.user ? 'inline' : 'none' }}
                                            >
                                            Add to cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(Items)