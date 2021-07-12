import React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'



interface IProps {

}

interface IInjectedProps extends IProps, WithStyles<typeof styles>{

}



interface IState {

}

const styles = (theme: Theme) => createStyles({
    home: {

    }
})


class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }



    get injected () {
        return this.props as IInjectedProps
    }

    render () {
        const { classes } = this.injected
        return (
            <div className={classes.home}>
                <h1>Home Page</h1>
            </div>
        )
    }
}

export default withStyles(styles)(Home)