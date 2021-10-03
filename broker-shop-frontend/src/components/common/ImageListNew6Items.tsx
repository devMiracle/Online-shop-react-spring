import React from 'react'
import {createStyles, Grid, Paper, Theme, WithStyles, withStyles} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
import {ProductStore} from "../../stores/ProductStore";
import History from "../../history";



interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
    productStore: ProductStore,

}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
    },

    img: {
        '&:hover': {
          opacity: '.8',
        },
        height: '480px',
        maxWidth: '480px',
        width: '100%',
    },
    item: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        margin: '2px 0',
    },
})




@inject('commonStore', 'productStore')
@observer
class ImageListNew6Items extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {
        this.injected.productStore.fetch6LastProducts()
    }

    handlerClickOnImage = (event: React.MouseEvent, id: number) => {
        this.injected.productStore.setCurrentProduct(id)
        History.push(`item?id=${id}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render () {
        const items = this.injected.productStore.products.slice(0, 6)
        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (


            <Grid
                container
            >
                {this.injected.productStore.products.slice(0, 6).map((item) => (
                    <Grid
                        key={item.id}
                        id={'item'}
                        className={classes.item}
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                    >
                        <div className={classes.imageContainer}>
                            <img
                                onClick={(e) => this.handlerClickOnImage(e, item.id)}

                                id={'imgId'} className={classes.img}
                                src={item.image} alt="image item"/>
                        </div>

                    </Grid>
                ))}

            </Grid>


        )
    }
}

export default withStyles(styles)(ImageListNew6Items)