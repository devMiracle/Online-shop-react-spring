import React, {FormEvent, KeyboardEventHandler} from 'react'
import {
    Checkbox,
    CheckboxProps,
    createStyles, FormControl,
    FormControlLabel,
    FormGroup, TextField,
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
    titleCake: string,
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
        width: 'max-content',
        '& div.MuiTextField-root div': {
            minWidth: '300px',
        },
    },
    fieldTitleCake: {

    },
    field: {
        marginTop: '40px',
    },
})


@inject('commonStore')
@observer
class DecorSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            checkedA: false,
            checkedB: false,
            titleCake: '',
        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {

    }

    handleChangeA = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({checkedA : event.target.checked});
    };
    handleChangeB = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ checkedB: event.target.checked});
    };


    handleOnChangeFieldTitleCake = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if (this.state.titleCake.length >= 10) {
        //     return
        // }
        // this.setState({titleCake: event.target.value})
        // console.log(this.state.titleCake)
    }

    onKeyPress = (event: any) => {
        console.log(event)
        if (this.state.titleCake.length >= 10) {
            return
        } else {
            this.setState({titleCake: event.target.value})
        }
    }

    // onInput = (event: any) => {
    //     console.log(event)
    //     if (this.state.titleCake.length >= 10) {
    //         return
    //     } else {
    //         this.setState({titleCake: event.target.value})
    //     }
    //     console.log(this.state.titleCake)
    // }

    render () {
        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChangeA} name="checkedA" />}
                        label="Фигурка как на фото (если есть)"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedB} onChange={this.handleChangeB} name="checkedB" />}
                        label="Надпись на торте"
                    />
                </FormGroup>
                <TextField
                    error={this.state.titleCake.length >= 10}
                    helperText={this.state.titleCake.length >= 10 ? 'достигнута максимальная длина' : ''}
                    className={classes.fieldTitleCake}
                    style={this.state.checkedB ? {display: 'block'}:{display: 'none'}}
                    id="outlined-textarea"
                    label="Надпись"
                    multiline
                    variant="outlined"
                    rowsMax={2}
                    // onInput = {this.onInput}
                    onKeyPress={this.onKeyPress}
                    value={this.state.titleCake}
                />
                <TextField
                    className={classes.field}
                    id="outlined-textarea"
                    label="Пожелание к заказу"
                    multiline
                    rows={4}
                    rowsMax={8}
                    variant="outlined"
                    aria-valuemax={400}
                />
            </div>
        )
    }
}

export default withStyles(styles)(DecorSelector)