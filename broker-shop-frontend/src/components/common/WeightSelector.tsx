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


interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
    cartStore: CartStore,
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
        backgroundColor: 'lightGray',
        borderRadius: '15px 15px 15px 15px',
        textAlign: 'center',


    },
})

@inject('commonStore', 'cartStore')
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
            this.injected.cartStore.setWeight(itemValue)
            const tooltip = document.getElementById('tooltipId')
            if (tooltip !== null) {
                tooltip.innerHTML = this.injected.commonStore.marks.find((el) => el.value === itemValue)?.text as string
            }
        })
        observer.observe(elem, config);
        elem.setAttribute('aria-valuenow', '0')
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {

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