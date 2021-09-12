import React from 'react'
import {
    Button,
    createStyles,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Theme, Typography,
    WithStyles,
    withStyles
} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
}

interface IState {
    open: boolean
}

const styles = (theme: Theme) => createStyles({
    root: {
        // width: '300px',
        // minHeight: '200px',
    },

})


@inject('commonStore')
@observer
class ModalDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: false
        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {

    }

    render () {
        const setOpen = (flag: boolean) => this.setState({open: flag});
        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
            this.injected.commonStore.setError('')
        };


        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={ !!this.injected.commonStore.error }
                >
                    <DialogTitle id="customized-dialog-title">
                        Упс. Что-то пошло не так
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <div id='errorBlock'>
                                {this.injected.commonStore.error}
                            </div>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            понятно
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(ModalDialog)