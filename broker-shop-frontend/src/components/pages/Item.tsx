import React from 'react'
import {
    Button,
    createStyles,
    Grid,
    Paper, Snackbar,
    Step, StepContent,
    StepLabel,
    Stepper,
    Theme, Typography,
    WithStyles,
    withStyles
} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
import {ProductStore} from "../../stores/ProductStore";
import {CategoryStore} from "../../stores/CategoryStore";
import WeightSelector from '../../components/common/WeightSelector'
import SectionsSelector from '../../components/common/SectionsSelector'
import {UserStore} from "../../stores/UserStore";
import DecorSelector from "../common/DecorSelector";
import {CartStore} from "../../stores/CartStore";
import {Alert} from "@material-ui/lab";
import CartItemModelCustom from "../../models/CartItemModelCustom";
interface IProps {

}

interface IInjectedProps extends IProps, WithStyles<typeof styles> {
    commonStore: CommonStore,
    productStore: ProductStore,
    categoryStore: CategoryStore,
    userStore: UserStore,
    cartStore: CartStore,
}

interface IState {
    itemIdIsExist: boolean,
    activeStep: number,
    snackBarVisibility: boolean,
    snackBarText: string,
}

function getSteps() {
    return ['Выбор веса', 'Выбор начинки', 'Выбор оформления'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <WeightSelector/>;
        case 1:
            return <SectionsSelector/>;
        case 2:
            return <DecorSelector/>;
        default:
            return 'Unknown step';
    }
}



const styles = (theme: Theme) => createStyles({
    root: {
        fontFamily: "'Comfortaa', cursive",
        background: '#f2f2f2',
        color: '#414141',
        //color: '#424242',
        // maxWidth: '970px',
        minWidth: '300px',
        margin: '0 auto',
        padding: '10px',
    },
    imageContainer: {

    },

    img: {
        width: '100%',
    },
    item: {
        width: '100%',
        display: 'flex',
    },
    textContainer: {

        width: '100%',
        padding: '0 20px 20px 20px',
        display: 'flex',
    },
    textArt: {
        color: '#a7a7a7',
        fontWeight: 100,
        fontSize: 'small',
        display: 'flex',
        '& > *': {
            margin: 0,
        },
    },
    title: {

        fontSize: 'x-large',
        fontWeight: 400,
        margin: 0,
    },
    descriptionTitle: {
        color: '#a7a7a7',
        fontWeight: 100,
        fontSize: 'medium',
        margin: 0,
        // textAlign: 'center',
    },
    description: {
        fontSize: 'medium',
        margin: 0,
    },
    categoryTitle: {
        color: '#a7a7a7',
        fontWeight: 100,
        fontSize: 'medium',
    },
    categoryText: {

    },
    categoryContainer: {
      display: 'flex',
    },

    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
        width: '100%',
    },
    ItemContainer: {
      width: '100%',
    },
})

@inject('commonStore', 'productStore', 'categoryStore', 'userStore', 'cartStore')
@observer
class Item extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            itemIdIsExist: false,
            activeStep: 0,
            snackBarVisibility: false,
            snackBarText: '',
        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount() {
        console.log('id = ' + this.injected.productStore.oneProduct?.id)
        console.log('price = ' + this.injected.productStore.oneProduct?.price)
        this.injected.cartStore.dataReset()
        this.injected.cartStore.setProductId(this.injected.productStore.oneProduct?.id)
        this.injected.cartStore.setPrice(this.injected.productStore.oneProduct?.price)

        // Анализ строки URL
        const windowUrl = window.location.search
        const params = new URLSearchParams(windowUrl)
        const id: string = params.get('id') || ''
        if (id){
            //this.injected.categoryStore.fetchCategories()
            this.injected.productStore.fetchProductById(Number(id))
            this.setState({itemIdIsExist: true})
        }
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

    handleAddToCart = (e: React.MouseEvent, productId: number) => {
        this.injected.cartStore.addToCart(productId, () => {
            this.setState({snackBarText: 'Товар добавлен в корзину'})
            this.setState({snackBarVisibility: true})
        })
    }

    handleAddData = (e: any) => {
        // this.injected.cartStore.addData(new CartItemModelCustom(1, 'qwerty', 444, 1))
    }

    handlerAddToCart = (e:any) => {
        console.log('add to cart')
    }

    render() {
        const setActiveStep = (activeStep: any) => this.setState({activeStep: activeStep})
        const steps = getSteps();

        const handleNext = () => {
            setActiveStep(this.state.activeStep + 1)

            console.log(
                this.injected.cartStore.data?.productId,
                this.injected.cartStore.data?.price,
                this.injected.cartStore.data?.title,
                this.injected.cartStore.data?.filling,
                this.injected.cartStore.data?.weight,
                this.injected.cartStore.data?.description,
                this.injected.cartStore.data?.sculpture,
                this.injected.cartStore.data?.quantity,
            )
        };

        const handleBack = () => {
            setActiveStep(this.state.activeStep - 1)
        };

        const handleReset = () => {
            setActiveStep(this.state.activeStep - steps.length);
            this.injected.cartStore.dataReset();
            this.injected.cartStore.setProductId(this.injected.productStore.oneProduct?.id)
            this.injected.cartStore.setPrice(this.injected.productStore.oneProduct?.price)

        };
        const { user } = this.injected.userStore
        const { loading } = this.injected.commonStore
        const { article } = this.injected.commonStore
        const { classes } = this.injected

        const { oneProduct } = this.injected.productStore


        let weight: number | undefined = this.injected.cartStore.data?.weight

            if (!loading) {
                return(
                    <div className={classes.root}>
                        <Grid
                            container
                        >
                            <Grid
                                id={'item'}
                                className={classes.item}
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                            >
                               <div className={classes.imageContainer}><img id={'imgId'} className={classes.img} src={oneProduct?.image} alt="image item"/></div>
                            </Grid>
                            <Grid
                                id={'item'}
                                className={classes.item}
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                            >
                                <div className={classes.textContainer}>
                                    <div>
                                        <div className={classes.textArt}><p>арт. </p><p>{article + oneProduct?.id}</p></div>
                                        <p className={classes.title}>{oneProduct?.title}</p>
                                        <div className={classes.categoryContainer}>
                                            <div className={classes.categoryTitle}>категория:&nbsp;</div>
                                            <div className={classes.categoryText}>{oneProduct?.category.name}</div>
                                        </div>
                                        <div>
                                            <p className={classes.descriptionTitle}>описание</p>
                                            <p className={classes.description}>{oneProduct?.description}</p>
                                        </div>
                                        {/*<p>цена: {Store.oneProduct?.price}</p>*/}
                                    </div>
                                </div>
                            </Grid>
                            <Grid
                                id={'item'}
                                className={classes.item}
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                            >
                                {/*Если пользователь авторизован, отображаем подробности к заказу*/}
                                {user ? <div className={classes.ItemContainer}>
                                    <div className={classes.stepper}>
                                        <Stepper activeStep={this.state.activeStep} orientation="vertical">
                                            {steps.map((label, index) => (
                                                <Step key={label}>
                                                    <StepLabel>{label}</StepLabel>
                                                    <StepContent>
                                                        <Typography>{getStepContent(index)}</Typography>
                                                        <div className={classes.actionsContainer}>
                                                            <div>
                                                                <Button
                                                                    disabled={this.state.activeStep === 0}
                                                                    onClick={handleBack}
                                                                    className={classes.button}
                                                                >
                                                                    Назад
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={handleNext}
                                                                    className={classes.button}
                                                                >
                                                                    {this.state.activeStep === steps.length - 1 ? 'Готово' : 'Далее'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </StepContent>
                                                </Step>
                                            ))}
                                        </Stepper>
                                        {this.state.activeStep === steps.length && (
                                            <Paper square elevation={0} className={classes.resetContainer}>
                                                <Typography>Заказ сформирован.</Typography>
                                                <ul>
                                                    <li>Вес: {this.injected.commonStore.marks.find((e) => e.value === weight)?.label}</li>
                                                    <li>Наполнение: {this.injected.cartStore.data?.filling}</li>
                                                    <li>Фигурка: {this.injected.cartStore.data?.sculpture? 'Да' : 'Нет'}</li>
                                                    <li>Надпись: {this.injected.cartStore.data?.title ? this.injected.cartStore.data?.title : 'Нет'}</li>
                                                    <li>Пожелание к заказу: {this.injected.cartStore.data?.description ? this.injected.cartStore.data?.description : 'Нет'}</li>
                                                    <li>Сумма: {this.injected.cartStore.data?.price}грн.</li>
                                                </ul>

                                                <Button onClick={handleReset} className={classes.button}>
                                                    Сброс
                                                </Button>
                                                <Button onClick={this.handlerAddToCart}>{'в корзину'.toUpperCase()}</Button>
                                            </Paper>
                                        )}
                                    </div>
                                </div> : <div>нужно авторизоваться</div>}


                            </Grid>
                        </Grid>
                        <Snackbar
                            open={this.state.snackBarVisibility}
                            autoHideDuration={6000} onClose={this.handleSnackBarClose}>
                            <Alert onClose={this.handleSnackBarClose} severity="success">
                                {this.state.snackBarText}
                            </Alert>
                        </Snackbar>
                    </div>
                )
            } else {
                return ''
            }
        }
    }

export default withStyles(styles)(Item)