import React from 'react'
import {NavLink} from "react-router-dom";
import {createStyles, Grid, Theme, WithStyles, withStyles} from '@material-ui/core'
import {UserStore} from "../../stores/UserStore";
import {inject, observer} from "mobx-react";



interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
 userStore: UserStore
}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: '#fcf7f1',
    },
    header: {
        maxWidth: '970px',
        margin: '0 auto',
        // height: '150px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    signing: {
        '& *:hover': {
            color: '#039be6',
            backgroundColor: 'white',
            border: '1px solid #039be6',
        },
        '& *': {
            transition: 'all .3s linear',
            color: 'white',
            textDecoration: 'none',
            width: '130px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            border: '1px solid #fff',
        },
        // pointerEvents: 'all',
        width: '130px',
        height: '30px',
        backgroundColor: '#039be6',
        borderRadius: '4px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'small',
        border: '1px solid #fff',
    },
    signup: {
        '& *:hover': {
            color: '#424242',
            backgroundColor: 'white',
            border: '1px solid #a6a6a6',
        },
        '& *': {
            transition: 'all .3s linear',
            color: 'white',
            textDecoration: 'none',
            width: '130px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            border: '1px solid #fff',
        },
        // pointerEvents: 'all',
        width: '130px',
        height: '30px',
        backgroundColor: '#424242',
        borderRadius: '4px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'small',
        border: '1px solid #fff',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',

    },
    gridContainer: {
        maxWidth: '970px',
        margin: '0 auto',
    },
    gridItem1: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    gridItem2: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: {
      padding: '5px',
        textAlign: 'center',
    },
    center: {
        margin: '0 auto',
        // justifyContent: 'center',
    },
})

@inject('userStore')
@observer
class Template extends React.Component<IProps, IState> {
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
        const { user } = this.injected.userStore
        const size = user ? 12 : 6
        return (
            <div className={classes.root}>
                <div className={classes.header}>


                </div>



                <Grid
                    container
                    className={classes.gridContainer}
                >
                    <Grid
                        item
                        lg={size}
                        md={size}
                        sm={12}
                        xs={12}
                        className={classes.gridItem1}
                    >
                        <div className={classes.text + ' ' + !user ? classes.center : ''}>
                            Проект находится в разработке, могут прослеживаться некоторые 'глюки'.
                        </div>
                    </Grid>
                    {!user ? <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        className={classes.gridItem2}
                    >
                        <div className={classes.buttons}>
                            <div className={classes.signing}>
                                <NavLink

                                    to={'/signin'}
                                    // activeClassName={classes.buttonBarItemActive}
                                    exact>
                                    {'вход'.toUpperCase()}
                                </NavLink>
                            </div>
                            <div className={classes.signup}>
                                <NavLink
                                    to={'/signup'}
                                    // activeClassName={classes.buttonBarItemActive}
                                    exact>
                                    {'регистрация'.toUpperCase()}
                                </NavLink>
                            </div>
                        </div>
                    </Grid> : ''}

                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(Template)