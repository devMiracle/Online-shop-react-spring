import React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import ImageListNew10Items from '../common/ImageListNew10Items'
import img1 from '../images/art3.png';
import {url} from "inspector";
import backImg from "../../images/back2.png";

interface IProps {

}

interface IInjectedProps extends IProps, WithStyles<typeof styles>{

}



interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {

    }
})


class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }



    get injected () {
        return this.props as IInjectedProps
    }

    render () {

        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <img src='../../images/art3.png' alt="image first"/>
                {/*<ImageListNew10Items/>*/}
            </div>
        )
    }
}

export default withStyles(styles)(Home)