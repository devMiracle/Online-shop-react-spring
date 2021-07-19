import React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {

}

interface IState {

}

const styles = (theme: Theme) => createStyles({

})



class Sections extends React.Component<IProps, IState> {
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
        // const { classes } = this.injected
        return (
            <div>
                <div>РАЗРЕЗЫ</div>

            </div>
        )
    }
}

export default withStyles(styles)(Sections)