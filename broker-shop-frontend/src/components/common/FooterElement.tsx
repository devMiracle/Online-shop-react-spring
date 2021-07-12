import React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {

}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    footerStyle: {
        backgroundColor: '#292a2e',
        color: '#7f7f7f',
        //borderTop: '1px dotted black',
        textAlign: 'center',
        // padding: '5px',
        // position: 'relative',
        // left: '0',
        // bottom: '0',
        // marginTop: '20px',
        // height: '60px',
        // width: '100%'
        // display: 'flex',
    }
})

class FooterElement extends React.Component<IProps, IState> {
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
        return (
            <div className={classes.footerStyle}>
               <div>footer</div>
                <address>
                    city: Mariupol
                </address>
                <div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                    <div>number: +3800-000-0000</div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(FooterElement)