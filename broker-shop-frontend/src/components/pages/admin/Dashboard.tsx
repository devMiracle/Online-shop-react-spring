import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
    Card,
    CardActions,
    CardContent,
    CardMedia, createStyles,
    Grid, Theme,
    Typography,
    WithStyles,
    withStyles
} from "@material-ui/core"
import category from '../../../images/categories.png'
import product from '../../../images/product.png'

interface IProps {
}

interface IInjectedProps extends IProps, WithStyles<typeof styles> {

}

interface IState {
}

const styles = (theme: Theme) =>
    createStyles({
        card: {
            margin: '20px',
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
    })

class Dashboard extends Component<IProps, IState> {
    get injected () {
        return this.props as IInjectedProps
    }
    render () {
        const { classes } = this.injected
        return <Grid container spacing={3}>
            <Grid item
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
            >
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={category}
                        title="Categories"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                Категории
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <NavLink
                                key={'/admin/categories'}
                                to={'/admin/categories'}
                            >
                                Войти
                            </NavLink>
                        </CardActions>
                    </div>
                </Card>
            </Grid>
            <Grid item
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
            >
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={product}
                        title="Products"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                Продукты
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <NavLink
                                key={'/admin/products'}
                                to={'/admin/products'}
                            >
                                Войти
                            </NavLink>
                        </CardActions>
                    </div>
                </Card>
            </Grid>
        </Grid>
    }
}

export default withStyles(styles)(Dashboard)