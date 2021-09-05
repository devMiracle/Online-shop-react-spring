import React from 'react'
import {
    Button,
    createStyles,
    MobileStepper,
    Paper, Slider,
    Theme,
    Typography,
    useTheme,
    WithStyles,
    withStyles
} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
import Tooltip from '@material-ui/core/Tooltip';
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import CartItemModelCustom from "../../models/CartItemModelCustom";
import {CartStore} from "../../stores/CartStore";
import {ProductStore} from "../../stores/ProductStore";


interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
    cartStore: CartStore,
    productStore: ProductStore
}

interface IState {

}




// function valuetext(value: number) {
//     return `${value} kg`;
// }
//
// function valueLabelFormat(value: number) {
//     return injected.commonStore.marks.findIndex((mark) => mark.value === value) + 1;
// }

const styles = (theme: Theme) => createStyles({
    root: {
        color: 'red',
        marginTop: '75px',
        marginLeft: '50px',
        maxWidth: '300px',
        // width: '100%',
    },
    margin: {
        height: theme.spacing(3),
    },
    tooltip: {
        height: '60px',
        minWidth: '80px',
        //minHeight: '60px',
        position: 'absolute',
        top: '-80px',
        backgroundColor: 'white',
        borderRadius: '15px 15px 15px 15px',
        border: '1px dashed #039be6',
        color: 'grey',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',

    },
})

@inject('commonStore', 'cartStore', 'productStore')
@observer
class WeightSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {
        this.injected.commonStore.turnButtonIsDisabled(false)
        // const elementTitle = document.getElementsByClassName('MuiStepLabel-active')[0]
        // elementTitle.innerHTML = `Выбор веса`;

        // Для отображения цены в скобках
        // const elem = document.getElementsByClassName('MuiSlider-thumb')[0]
        // const elementTitle = document.getElementsByClassName('MuiStepLabel-active')[0]
        // const elem = document.getElementsByClassName('MuiSlider-thumb')[0]
        // const itemValue = Number(elem.attributes.getNamedItem('aria-valuenow')?.value)
        // const multiplier = this.injected.commonStore.marks.find((el) => el.value === itemValue)?.multiplier as number
        // const kg = this.injected.commonStore.marks.find((el) => el.value === itemValue)?.label as string
        // const sum = this.injected.productStore.oneProduct?.price as number * multiplier
        // console.log(sum)
        // elementTitle.innerHTML = `Выбор веса (цена: ${sum}грн. за ${kg})`

        const elem = document.getElementsByClassName('MuiSlider-thumb')[0]
        const tooltipNewElement = document.createElement('div')
        tooltipNewElement.className = this.injected.classes.tooltip
        tooltipNewElement.id = 'tooltipId'
        elem.appendChild(tooltipNewElement)
        const config = {
            attributes: true,
        }
        const observer = new MutationObserver((e) => {
            const elemThumb = document.getElementsByClassName('MuiSlider-thumb')[0]
            const itemValue = Number(elemThumb.attributes.getNamedItem('aria-valuenow')?.value)
            this.injected.cartStore.setWeight(this.injected.commonStore.marks.find((e) => e.value === itemValue)?.multiplier as number)
            const tooltip = document.getElementById('tooltipId')
            if (tooltip !== null) {
                tooltip.innerHTML = this.injected.commonStore.marks.find((el) => el.value === itemValue)?.text as string
            }

            // const elementTitle = document.getElementsByClassName('MuiStepLabel-active')[0]
            // const multiplier = this.injected.commonStore.marks.find((el) => el.value === itemValue)?.multiplier as number
            // const kg = this.injected.commonStore.marks.find((el) => el.value === itemValue)?.label as string
            // const x = this.injected.productStore.oneProduct?.price as number
            // const y = multiplier
            // const sum = Math.ceil((x) * (y))
            // elementTitle.innerHTML = `Выбор веса (цена: ${sum}грн. за ${kg})`

            const multiplier = this.injected.commonStore.marks.find((e) => e.value === itemValue)?.multiplier as number
            const price1kg = this.injected.productStore.oneProduct?.price
            const sum = Math.ceil((Number(price1kg)) * (Number(multiplier)))
            this.injected.cartStore.setPrice(sum)
        })
        observer.observe(elem, config);
        // Вызываем setAttribute чтобы сработал observer
        elem.setAttribute('aria-valuenow', '0')


        // const elementTitle = document.getElementsByClassName('MuiStepLabel-active')[0]
        // elementTitle.innerHTML = `Выбор веса (цена: ${777}грн. за ${77})`
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {

    }

    componentWillUnmount() {
        const elemThumb = document.getElementsByClassName('MuiSlider-thumb')[0]
        const itemValue = Number(elemThumb.attributes.getNamedItem('aria-valuenow')?.value)
        const multiplier = this.injected.commonStore.marks.find((e) => e.value === itemValue)?.multiplier as number
        const price1kg = this.injected.productStore.oneProduct?.price
        const sum = Math.ceil((Number(price1kg)) * (Number(multiplier)))
        this.injected.cartStore.setPrice(sum)
    }

    render () {


        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <Slider
                    defaultValue={0}
                    //valueLabelFormat={valueLabelFormat}
                    //getAriaValueText={valuetext}
                    step={null}
                    marks={this.injected.commonStore.marks}
                    valueLabelDisplay="off"
                />
            </div>
        )
    }
}

export default withStyles(styles)(WeightSelector)