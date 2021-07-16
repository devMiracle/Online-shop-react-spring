import React from 'react'
import {createStyles, Grid, Theme, WithStyles, withStyles} from '@material-ui/core'

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {

}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {

    },

})

class Cart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {

    }

    render () {
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <h1>корзина</h1>

            </div>
        )
    }
}

export default withStyles(styles)(Cart)