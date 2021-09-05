import React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";

// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';
// import itemData from './itemData';
// import image from 'path/to/image.jpg';

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
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

})


    // const itemData = [
    //   {
    //     img: image,
    //     title: 'Image',
    //     author: 'author',
    //     cols: 2,
    //  },
    // ];

@inject('commonStore')
@observer
class ImageListNew10Items extends React.Component<IProps, IState> {
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
        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                ImageListNew10Items
                {/*<ImageList rowHeight={160} className={classes.imageList} cols={3}>*/}
                {/*    {itemData.map((item) => (*/}
                {/*        <ImageListItem key={item.img} cols={item.cols || 1}>*/}
                {/*            <img src={item.img} alt={item.title} />*/}
                {/*        </ImageListItem>*/}
                {/*    ))}*/}
                {/*</ImageList>*/}
            </div>
        )
    }
}

export default withStyles(styles)(ImageListNew10Items)