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



class Confidentiality extends React.Component<IProps, IState> {
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
                <h2>Конфиденциальность</h2>
                <div>Любая иннофрмация о клиенте третим лицам не передается.</div>
            </div>
        )
    }
}

export default withStyles(styles)(Confidentiality)