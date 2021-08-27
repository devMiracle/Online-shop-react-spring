import React from 'react'
import {
    Button,
    createStyles,
    MobileStepper,
    Paper,
    Theme,
    Typography,
    useTheme,
    WithStyles,
    withStyles
} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";


import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {CartStore} from "../../stores/CartStore";

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
    cartStore: CartStore,

}

interface IState {
    activeStep: number
}

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = (theme: Theme) => createStyles({
    root: {
        // width: '100%',
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },

})

@inject('commonStore', 'cartStore')
@observer
class SectionsSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            activeStep: 0
        }
    }

    setActiveStep(step: number) {
        this.setState({activeStep: step})
    }

    get injected () {
        return this.props as IInjectedProps
    }

    handleNext = () => {
        this.setActiveStep(this.state.activeStep + 1);
    };

    handleBack = () => {
        this.setActiveStep(this.state.activeStep - 1);
    };

    handleStepChange = (step: number) => {
        this.setActiveStep(step);
    };

    componentDidMount () {
        this.injected.cartStore.setFilling(this.injected.commonStore.images[0].label)
        const elem = document.getElementsByClassName('KeyboardArrowRightJs')[0]
        const config = {
            attributes: true,
            childList: true,
            characterDataOldValue: true,
            subtree: true,
        }
        const observer = new MutationObserver((e) => {
            const elem = document.getElementsByClassName('KeyboardArrowRightJs')[0]
            this.injected.cartStore.setFilling(elem.innerHTML)
        })
        observer.observe(elem, config);
    }

    render () {
        const { loading } = this.injected.commonStore
        const { images } = this.injected.commonStore
        const { classes } = this.injected
        const theme = {
            direction: 'x-reverse'
        }
        const maxSteps = images.length;
        return (
            <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                    <Typography><div className={'KeyboardArrowRightJs'}>{images[this.state.activeStep].label}</div></Typography>
                </Paper>
                {/*<AutoPlaySwipeableViews*/}
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div key={step.label}>
                            {Math.abs(this.state.activeStep - index) <= 2 ? (
                                <img className={classes.img} src={step.imgPath} alt={step.label} />
                            ) : null}
                        </div>
                    ))}
                    {/*</AutoPlaySwipeableViews>*/}
                </SwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={this.state.activeStep}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </div>
        )
    }
}

export default withStyles(styles)(SectionsSelector)