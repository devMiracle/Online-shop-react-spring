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



class Return extends React.Component<IProps, IState> {
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
                <h2>Возврат</h2>
                <p>Мы не несем ответственности за продукцию, с момента передачи её в руки заказчику.</p>
            </div>
        )
    }
}

export default withStyles(styles)(Return)