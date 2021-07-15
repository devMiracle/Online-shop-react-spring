import React from 'react'
import {inject, observer} from "mobx-react";
import {createStyles, Theme, WithStyles, withStyles, Grid} from '@material-ui/core'
import {CategoryStore} from "../../stores/CategoryStore";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    categoryStore: CategoryStore
}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {
        boxShadow: '0 0 24px 4px rgba(0,0,0,0.1)',
        // width: 450,
        width: '98%',
        maxWidth: 480,
        // marginBottom: 10,
        // marginLeft: 5,
        margin: '4px 0'
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
    },
    media: {

        height: 120,
        width: 160,
    },
    cardDirection: {
        display: 'flex',
        flexDirection: 'row',

    },
    categoryPage: {
      padding: '5px 0'
    },
    cardContent : {
        width: '100%',
        textAlign: 'center',
        padding: 8,
    },
    typography: {
      fontSize: 'larger',
    },
})


@inject('categoryStore')
@observer
class Categories extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {
        this.injected.categoryStore.fetchCategories()
    }

    render () {
        const { categories } = this.injected.categoryStore
        const { classes } = this.injected
        return (
            <div className={classes.categoryPage}>
                <Grid container
                    // spacing={2}
                >
                    {categories.map(category => {
                        return (
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                className={classes.gridItem}
                            >
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <div className={classes.cardDirection}>
                                            <CardMedia
                                                className={classes.media}
                                                image={category.image}
                                                title="category photo"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <div className={classes.typography}>
                                                    {category.name.toUpperCase()}
                                                </div>
                                                {/*<Typography variant="h6" component="div">*/}
                                                {/*    {category.name.toUpperCase()}*/}
                                                {/*</Typography>*/}
                                                {/*<Typography variant="body1" color="textSecondary" component="p">*/}

                                                {/*</Typography>*/}
                                            </CardContent>
                                        </div>
                                    </CardActionArea>
                                    {/*<CardActions>*/}
                                    {/*    <Button size="small" color="primary">*/}
                                    {/*        Share*/}
                                    {/*    </Button>*/}
                                    {/*    <Button size="small" color="primary">*/}
                                    {/*        Learn More*/}
                                    {/*    </Button>*/}
                                    {/*</CardActions>*/}
                                </Card>
                            </Grid>




                        )
                    })}

                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(Categories)