import React from 'react'
import {
    Checkbox,
    CheckboxProps,
    createStyles,
    FormControlLabel,
    FormGroup,
    Theme,
    WithStyles,
    withStyles
} from '@material-ui/core'
import {inject, observer} from "mobx-react";
import {CommonStore} from "../../stores/CommonStore";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {
    commonStore: CommonStore,
}

interface IState {
    checkedA: boolean,
    checkedB: boolean,
    checkedF: boolean,
    checkedG: boolean,
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const styles = (theme: Theme) => createStyles({
    root: {

    },

})


@inject('commonStore')
@observer
class Decor extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            checkedA: true,
            checkedB: true,
            checkedF: true,
            checkedG: true,
        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {

    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ checkedA: event.target.checked});
    };

    render () {
        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
                        label="Secondary"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedB}
                                onChange={this.handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Primary"
                    />
                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
                    <FormControlLabel disabled control={<Checkbox name="checkedD" />} label="Disabled" />
                    <FormControlLabel disabled control={<Checkbox checked name="checkedE" />} label="Disabled" />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedF}
                                onChange={this.handleChange}
                                name="checkedF"
                                indeterminate
                            />
                        }
                        label="Indeterminate"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox checked={this.state.checkedG} onChange={this.handleChange} name="checkedG" />}
                        label="Custom color"
                    />
                    <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                        label="Custom icon"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                name="checkedI"
                            />
                        }
                        label="Custom size"
                    />
                </FormGroup>
            </div>
        )
    }
}

export default withStyles(styles)(Decor)