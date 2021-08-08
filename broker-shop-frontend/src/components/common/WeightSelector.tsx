import React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {

    },

})


@inject('commonStore')
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

    }

    render () {
        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <p>WeightSelector</p>

            </div>
        )
    }
}

export default withStyles(styles)(WeightSelector)