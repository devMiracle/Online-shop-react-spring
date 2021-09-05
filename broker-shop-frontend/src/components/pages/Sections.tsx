import React from 'react'
import {createStyles, Grid, Theme, WithStyles, withStyles} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {

    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },

    img: {
        width: '300px',
    },
    item: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        margin: '10px 0',
    },
    textContainer: {
      width: '300px',
        alignSelf: 'center',
    },
    h2: {
        textAlign: 'center',
    },
})


@inject('commonStore')
@observer
class Sections extends React.Component<IProps, IState> {
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
        const { images } = this.injected.commonStore
        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <h2 className={classes.h2}>Разрезы</h2>
                <Grid
                    container
                >
                {images.map((item) => (
                    <Grid
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
                            <img id={'imgId'} className={classes.img} src={item.imgPath} alt="image item"/>
                        </div>
                        <div className={classes.textContainer}>
                            {item.label}
                        </div>
                    </Grid>
                ))}

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Sections)