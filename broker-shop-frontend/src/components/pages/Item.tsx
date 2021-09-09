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
import Communication from '../common/Сommunication'
import {UserStore} from "../../stores/UserStore";
import DecorSelector from "../common/DecorSelector";
import {CartStore} from "../../stores/CartStore";
import {Alert} from "@material-ui/lab";
import CartItemModelCustom from "../../models/CartItemModelCustom";
import history from "../../history";
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
    buttonIsDisabled: boolean,
}

function getSteps() {
    return ['Выбор веса', 'Выбор начинки', 'Выбор оформления', 'Связь'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <WeightSelector/>;
        case 1:
            return <SectionsSelector/>;
        case 2:
            return <DecorSelector/>;
        case 3:
            return <Communication/>;
        default:
            return 'Unknown step';
    }
}

const styles = (theme: Theme) => createStyles({
    root: {
        // fontFamily: "'Comfortaa', cursive",
        // background: '#f2f2f2',
        color: '#414141',
        //color: '#424242',
        // maxWidth: '970px',
        minWidth: '300px',
        margin: '0 auto',
        marginTop: '10px',
        padding: '10px',
        // border: '1px dashed rgba(66,66,66,0.2)',
        boxShadow: '0 0 8px 1px rgba(66,66,66,0.2)',
    },
    imageContainer: {
        width: '100%',
    },

    img: {
        width: '100%',
    },
    item: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
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
        margin: '10px 0',
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
        margin: '10px 0',
      display: 'flex',
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'column',
    },

    button: {
        '&:hover':{
            backgroundColor: '#039be6',
            opacity: '.8',
        },
        color: 'white',
        backgroundColor: '#039be6',
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
    noNumber: {
        display: 'inline',
        color: "red",
    },
    buttonInCart: {
        '&:hover':{
            backgroundColor: '#009900',
            opacity: '.8',
        },
        color: "white",
        backgroundColor: '#009900',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),

    },
    ErrorAuth: {
        textAlign: 'center',
      color: 'red',
    },
    text: {
        '&:hover': {
            color: '#424242',
            cursor:  'pointer',
        },
        color: '#a6a6a6',
        marginTop: '10px',
        textAlign: 'center',
        textDecoration: 'underline',
    },
    messagePlsAuth: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    warn: {
        backgroundColor: '#fcf7f1',
    },
    textGray: {
        color: '#a6a6a6',
    },
    textContainer2: {
      display: 'flex',
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
            buttonIsDisabled: false,
        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount() {
        // На всякий включаем кнопки
        this.injected.commonStore.turnButtonIsDisabled(false)
        // Анализ строки URL
        const windowUrl = window.location.search
        const params = new URLSearchParams(windowUrl)
        const id: string = params.get('id') || ''
        if (id){
            //this.injected.categoryStore.fetchCategories()
            this.injected.productStore.fetchProductById(Number(id), this.callback)
            this.setState({itemIdIsExist: true})
        }
    }

    callback = () => {
        this.injected.cartStore.dataReset()
        this.injected.cartStore.setProductId(this.injected.productStore.oneProduct?.id)
        this.injected.cartStore.setPrice(this.injected.productStore.oneProduct?.price)
        this.injected.cartStore.setWeight(2)
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

    handleClickAuthorization = () => {
        history.push('/signin')
    }

    handleClickRegistration = () => {
        history.push('/signup')
    }

    handlerAddToCart = (e:any) => {
        this.injected.cartStore.addToCart(Number(this.injected.cartStore.data?.productId), () => {})
        this.setState({
            snackBarText: 'Заказ отправлен в корзину',
            snackBarVisibility : true,
        })
        const setActiveStep = (activeStep: any) => this.setState({activeStep: activeStep})
        const steps = getSteps();
        setActiveStep(this.state.activeStep - steps.length);
        this.injected.cartStore.dataReset();
        this.injected.cartStore.setProductId(this.injected.productStore.oneProduct?.id)
        this.injected.cartStore.setPrice(this.injected.productStore.oneProduct?.price)
        this.injected.cartStore.setWeight(2)
    }

    // callback = () => {
    //     this.injected.cartStore.setProductId(this.injected.productStore.oneProduct?.id)
    //     this.injected.cartStore.setPrice(this.injected.productStore.oneProduct?.price)
    // }

    render() {
        const setActiveStep = (activeStep: any) => this.setState({activeStep: activeStep})
        const steps = getSteps();
        const handleNext = () => {
            setActiveStep(this.state.activeStep + 1)
        };

        const handleBack = () => {
            setActiveStep(this.state.activeStep - 1)
        };

        const handleReset = () => {
            setActiveStep(this.state.activeStep - steps.length);
            this.injected.cartStore.dataReset();
            this.injected.cartStore.setProductId(this.injected.productStore.oneProduct?.id)
            this.injected.cartStore.setPrice(this.injected.productStore.oneProduct?.price)
            this.injected.cartStore.setWeight(2)

        };
        const { user } = this.injected.userStore
        const { loading } = this.injected.commonStore
        const { article } = this.injected.commonStore
        const { classes } = this.injected

        const { oneProduct } = this.injected.productStore
            if (!false) {
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
                                        <div className={classes.textArt}><p>арт. </p><p>{/*article + */oneProduct?.id}</p></div>
                                        <p className={classes.title}>{oneProduct?.title}</p>
                                        <div className={classes.categoryContainer}>
                                            <div className={classes.categoryTitle}>категория:&nbsp;</div>
                                            <div className={classes.categoryText}>{oneProduct?.category.name}</div>
                                        </div>
                                        <div className={classes.descriptionContainer}>
                                            <p className={classes.descriptionTitle}>описание:</p>
                                            <p className={classes.description}>{oneProduct?.description}</p>
                                        </div>
                                        <p className={classes.warn}>Внимание! Цена указана за 1 кг. изделия!</p>
                                        <div className={classes.textContainer2}>
                                            <div className={classes.textGray}>Цена за 1 килограмм:&nbsp;</div>
                                            <div>{this.injected.productStore.oneProduct?.price}грн</div>
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
                                                                    disabled={this.state.activeStep === 0 || this.injected.commonStore.buttonIsDisabled}
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
                                                                    disabled={this.injected.commonStore.buttonIsDisabled}
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
                                                    <li>Вес: {this.injected.cartStore.data?.weight}кг</li>
                                                    <li>Наполнение: {this.injected.cartStore.data?.filling}</li>
                                                    <li>Фигурка: {this.injected.cartStore.data?.sculpture? 'Да' : 'Нет'}</li>
                                                    <li>Надпись: {this.injected.cartStore.data?.title ? this.injected.cartStore.data?.title : 'Нет'}</li>
                                                    <li>Пожелание к заказу: {this.injected.cartStore.data?.description ? this.injected.cartStore.data?.description : 'Нет'}</li>
                                                    <li>Телефон: {this.injected.cartStore.data?.phoneNumber ? this.injected.cartStore.data?.phoneNumber : <div className={classes.noNumber}>не указан</div>}</li>
                                                    <li>Сумма: {this.injected.cartStore.data?.price}грн.</li>
                                                </ul>
                                                <Button onClick={handleReset} className={classes.button}>
                                                    Сброс
                                                </Button>
                                                <Button className={classes.buttonInCart} onClick={this.handlerAddToCart}>{'в корзину'.toUpperCase()}</Button>
                                            </Paper>
                                        )}
                                    </div>
                                </div> :
                                    <div className={classes.messagePlsAuth}>
                                        <div className={classes.ErrorAuth}>Для заказа сначала нужно авторизоваться</div>
                                        <div className={classes.text}>
                                            <div onClick={this.handleClickAuthorization}>Уже есть акаунт? Вход</div>
                                        </div>
                                        <div className={classes.text}>
                                            <div onClick={this.handleClickRegistration}>Зарегистрироваться</div>
                                        </div>
                                    </div>}


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