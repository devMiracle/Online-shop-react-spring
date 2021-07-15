import React from 'react'
import {createStyles, Grid, Theme, WithStyles, withStyles} from '@material-ui/core'

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {

}

interface IState {

}

const styles = (theme: Theme) => createStyles({


})

class TestComponent extends React.Component<IProps, IState> {
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
            <>
                <h1>TEST</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, aut deserunt dolor eaque error in inventore laudantium magni repellendus temporibus unde, voluptate? Alias debitis deserunt dicta id impedit in, laboriosam libero, mollitia omnis, quis quisquam quod tempore? Corporis dolor error expedita id maxime quos? Alias atque eligendi facilis ipsum necessitatibus officiis quo! Accusantium aspernatur corporis culpa, doloribus eos eum ex fuga fugiat, fugit ipsa iste magni nesciunt nisi non obcaecati officiis optio perspiciatis placeat porro possimus quasi quo quos recusandae reiciendis rerum tempore veritatis vero. Ad dolorum ducimus eligendi fugiat, harum in iure laborum natus odio odit pariatur provident quibusdam tempore velit vero vitae voluptatibus. Amet aperiam ipsa, laboriosam libero mollitia nam neque officia officiis perspiciatis placeat quibusdam recusandae reprehenderit, sed sequi temporibus? Ad alias aliquam aliquid, animi asperiores beatae commodi consequuntur deleniti dolor, esse exercitationem minus molestias nam neque numquam provident quae quia, similique sint soluta tenetur unde vel voluptates! A ab est exercitationem iusto nostrum quidem sapiente, voluptate? Asperiores atque harum maiores nulla odio optio possimus quam quisquam suscipit veniam. Asperiores, assumenda cupiditate delectus, deleniti, expedita fugit id laboriosam laudantium nemo officia quae quia reiciendis sequi sit voluptate. Aliquid dolores est et laborum nobis quis, sed tempora tempore ullam vel. A accusamus accusantium ad architecto assumenda commodi consequatur cum deleniti dolores dolorum error facere, facilis fuga, illum iusto labore laboriosam nemo nihil, odit omnis optio pariatur porro quae quasi quis sequi voluptatum. Aliquid dignissimos, distinctio harum laborum optio repellat similique sint tempora ut voluptate. Accusamus at autem, eligendi eos est exercitationem facere facilis fugiat illo itaque labore magni maiores molestiae necessitatibus nostrum nulla odio odit perspiciatis praesentium quas quibusdam, quidem quisquam repellendus sapiente sequi similique totam ut velit voluptate, voluptates? At beatae dolores doloribus earum, eius eveniet hic in ipsa itaque obcaecati officia quasi repudiandae, rerum veritatis voluptate. A ad, adipisci, amet doloribus eaque earum et excepturi facilis fugit modi odit quo, quos reiciendis repellat repudiandae sunt veniam veritatis? Eaque earum, error incidunt maiores officiis placeat repellendus velit veniam vero voluptas. Dolor dolorum hic possimus quas sunt? Aperiam delectus doloremque earum eos facere fugiat incidunt iure, iusto laborum laudantium, libero minima nihil odit officia porro quasi quibusdam quidem quis, reiciendis sed velit veritatis voluptates voluptatum! Accusamus ad alias, aut blanditiis deserunt dolorem ea, est eum ex explicabo facilis iste optio pariatur quam rerum temporibus voluptatum. Animi architecto, ea eveniet id illum iste iure labore quas quia quibusdam soluta!
                </p>
            </>
        )
    }
}

export default withStyles(styles)(TestComponent)