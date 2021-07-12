import React from 'react'
import {inject, observer} from "mobx-react";
import {createStyles, Theme, WithStyles, withStyles, Grid} from '@material-ui/core'
import {CategoryStore} from "../../stores/CategoryStore";

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    categoryStore: CategoryStore
}

interface IState {

}

const styles = (theme: Theme) => createStyles({

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
            <div>
                <div>КАТЕГОРИИ</div>
                <Grid container>
                    {categories.map(category => {
                        return (
                            <div>
                                <div>{category.name}</div>
                                <img style={{width: '300px', height: '300px'}} src={category.image} alt="category image"/>
                            </div>
                        )
                    })}

                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(Categories)