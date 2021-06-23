import React, {Component} from "react"
import {createStyles, Theme} from "@material-ui/core/styles"
import {WithStyles} from "@material-ui/core"
import Box from '@material-ui/core/Box'


interface IProps {
    // стандартный внешний параметр,
    // в который может попасть значение,
    // указанное в разметке родительского компонента
    // между открываюим и закрывающим тегами разметки создания
    // эземпляра дочернего (данного) компонента
}

interface IInjectedProps extends IProps, WithStyles<typeof styles> {

}

interface IState {
}

const styles = (theme: Theme) => createStyles({
    borderImage: {
        border: '1px'
    }
})

class Product3D extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
        }

    }
    get injected () {
        // по факту все внешние параметры содержатся в this.props,
        // но для доступа к неявно переданным из них
        // this.props типизируем IInjectedProps
        return this.props as IInjectedProps
    }

    componentDidMount() {

    }

    render() {
        // const { classes } = this.injected


        const url1:string = process.env.PUBLIC_URL
        return (
            <Box
                border={1}
                // className={classes.borderImage}
                >
                <div
                    className="cloudimage-360"
                    //data-folder={imageFolder3d}
                    data-folder={url1}
                    data-filename="1coub-{index}.jpg"
                    data-amount="32"
                ></div>
                {/*<img src={image1} alt="1"/>*/}
                {/*<img src={image} width={3888/6} height={2592/6} alt="2"/>*/}
            </Box>

            
        )
    }
}
export default Product3D