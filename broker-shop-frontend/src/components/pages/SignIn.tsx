import React, { Component } from 'react'
import {inject, observer} from "mobx-react"
import {Button, Card, CardContent, Grid, TextField, WithStyles, withStyles} from "@material-ui/core"
import { createStyles, Theme } from '@material-ui/core/styles'
import SendIcon from "@material-ui/icons/Send"
import {CommonStore} from "../../stores/CommonStore";
import {UserStore} from "../../stores/UserStore";
import history from "../../history";
// тип CommonStore экспортируется из модуля
// не по умолчанию,
// поэтому здесь импортируется в фигурных скобках,
// и его имя должно быть указано точно так же,
// как было указано при экспорте

interface IProps {}
interface IInjectedProps extends WithStyles<typeof styles> {
    commonStore: CommonStore,
    userStore: UserStore
}
interface IState {}

const styles = (theme: Theme) => createStyles
({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            //width: '25ch',
        },

    },
    signInGrid: {
        //minHeight: '40vh'
    },
    card: {
        marginTop: '40px',
        color: '#424242',
        backgroundColor: 'rgba(166,166,166,0.05)',
        width: 275,
    },
    buttonSubmit: {
      backgroundColor: '#fcf7f1',
        position: 'relative',
        bottom: '-15px',
    },
    SendIcon: {
      marginLeft: '10px',
    },
    text: {
        '&:hover': {
            color: '#424242',
            cursor:  'pointer',
        },
        color: '#a6a6a6',
        marginTop: '25px',
        textAlign: 'center',
        textDecoration: 'underline',
    },
})

@inject("commonStore", "userStore")
@observer
class SignIn extends Component<IProps, IState> {

    get injected () {
        return this.props as IInjectedProps
    }

    componentWillUnmount() {
        this.injected.userStore.reset()
    }

    // обработчик события изменения значения в поле
    // ввода имени пользователя
    handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // установка свойства состояния "имя пользователя"
        // (читаем из аргументов события атрибут value поля ввода,
        // для коротого обрабатывается событие)
        this.injected.userStore.setUserName(e.target.value)
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.injected.userStore.setPassword(e.target.value)
    }

    handleSubmitForm = (e: React.MouseEvent) => {
        // предотвращаем отправку данных формы на сервер браузером
        // и перезагрузку страницы
        e.preventDefault()
        // вызываем в хранилище действие входа в учетную запись
        this.injected.userStore.login()
    }

    handleClickRegistration = () => {
        history.push('/signup')
    }

    render () {
        const { loading } = this.injected.commonStore
        const { classes } = this.injected
        const {userName, password} = this.injected.userStore
        return (
            <Grid container
                  spacing={0}
                  direction='column'
                  alignContent='center'
                  justify='center'
                  className={classes.signInGrid}
            >
                <Grid item
                      xs={12}
                      sm={12}
                      md={3}
                      lg={3}
                      xl={3}
                >
                    <Card className={classes.card}>
                        <CardContent>
                            <form className={classes.root}
                                  noValidate
                                  autoComplete="off"
                                  title="Sign In"
                            >
                                <h2>{'вход'.toUpperCase()}</h2>
                                <div>
                                    <TextField
                                        id='username'
                                        label='Логин'
                                        value={userName}
                                        onChange={this.handleUserNameChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id='password'
                                        label='Пароль'
                                        value={password}
                                        type="password"
                                        onChange={this.handlePasswordChange}
                                    />
                                </div>
                                <div>
                                    <Button
                                        id='signInButton'
                                        variant='outlined'
                                        disabled={loading}
                                        onClick={this.handleSubmitForm}
                                        className={classes.buttonSubmit}
                                    >
                                        {'вход'.toUpperCase()}
                                        <SendIcon className={classes.SendIcon}/>
                                    </Button>
                                </div>
                                <div className={classes.text}>
                                    <div onClick={this.handleClickRegistration}>Зарегистрироваться</div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(SignIn)