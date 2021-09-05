import React from 'react'
import {createStyles, TextField, Theme, WithStyles, withStyles} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
import {CartStore} from "../../stores/CartStore";
interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
    cartStore: CartStore
}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {

    },

})




@inject('commonStore', 'cartStore')
@observer
class Communication extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {
        this.injected.commonStore.turnButtonIsDisabled(true)
    }

    handlerChangeTextField = (e: any) => {
        const regex = '^((8|\\+3)[\\- ]?)?(\\(?\\d{3,4}\\)?[\\- ]?)?[\\d\\- ]{5,10}$'
        if (e.target.value.match(regex)) {
            this.injected.commonStore.turnButtonIsDisabled(false)
            this.injected.cartStore.setPhoneNumber(e.target.value)
        } else {
            this.injected.commonStore.turnButtonIsDisabled(true)
        }
    }




    render () {
        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-secondary" variant="outlined" label="Телефон для связи" onChange={this.handlerChangeTextField}/>
                </form>

            </div>
        )
    }
}

export default withStyles(styles)(Communication)