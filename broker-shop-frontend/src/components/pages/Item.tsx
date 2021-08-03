import React from 'react'
import {createStyles, Grid, Theme, WithStyles, withStyles} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
import {ProductStore} from "../../stores/ProductStore";
import {CategoryStore} from "../../stores/CategoryStore";
import History from '../../history'
interface IProps {

}

interface IInjectedProps extends IProps, WithStyles<typeof styles> {
    commonStore: CommonStore,
    productStore: ProductStore,
    categoryStore: CategoryStore,
}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {
        maxWidth: '970px',
        margin: '0 auto',
    },
})


@inject('commonStore', 'productStore', 'categoryStore')
@observer
class Item extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            backgroundColor: 'lightGray',
        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount() {

    const windowUrl = window.location.search
    const params = new URLSearchParams(windowUrl)
    const id: string = params.get('id') || ''
        if (id){
        this.injected.productStore.fetchProductById(Number(id))
        }
    }

    render() {
        const { loading } = this.injected.commonStore
        const { name } = this.injected.categoryStore
        const Store = this.injected.productStore
        const { classes } = this.injected
            return(
                <div className={classes.root}>
                    <Grid
                    container
                    >
                        <Grid
                        item
                        >
                            <p>id: {Store.currentProductId}</p>
                            <p>title: {Store.title}</p>
                            <p>description: {Store.description}</p>
                            <p>category: {name}</p>
                            <p>price: {Store.price}</p>
                            <img src={Store.currentProductImage} alt=""/>
                        </Grid>


                    </Grid>
                </div>
            )
        }
    }

export default withStyles(styles)(Item)