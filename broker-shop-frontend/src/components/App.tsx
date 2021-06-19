import React from 'react'
import {Router, Route} from 'react-router-dom'
import {CommonStore} from '../stores/CommonStore'
import {RouterStore} from '../stores/RouterStore'
import {inject, observer} from "mobx-react"

import {
    AppBar,
    Modal,
    Container,
    createStyles,
    Theme,
    Toolbar,
    Typography,
    withStyles,
    WithStyles
} from "@material-ui/core"

import history from "../history"
import {CSSTransition} from "react-transition-group";
import AppBarCollapse from "./common/AppBarCollapse";

interface IProps {
    // Перечисляются все внешние параметры (свойства)
    // переданные явно из оъекта родительского компонента
}
interface IInjectedProps extends IProps, WithStyles<typeof styles> {
    // Перечисляются все внешние параметры (свойства)
    // переданные не явно (например, внедрением зависимости при помощи декораторов)
    commonStore: CommonStore,
    routerStore: RouterStore

}
interface IState {}
const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    container: {
        maxWidth: '970px',
        '& .page': {
            position: 'static'
        }
    },
    navBar: {
        color: '#fff',
        backgroundColor: '#ee6e73'
    },
    title: {
        flexGrow: 1
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
})
@inject('commonStore', 'routerStore')
@observer
class App extends React.Component<IProps, IState> {
    // Геттер свойства, который подводит фактически полученные props
    // под интерфейс неявно полученных props
    get injected () {
        return this.props as IInjectedProps
    }

    handleErrorModalClose = (e: React.KeyboardEvent | React.MouseEvent) => {
        this.injected.commonStore.setError('')
    }

  render() {
    const {classes, routerStore} = this.injected
    return (
        <Router history={history}>
            <div className={classes.root}>
                {/* панель приложения, "приклееная" к верхней части страницы */}
                <AppBar position='sticky' className={classes.navBar}>
                    <Toolbar>
                        <Typography variant='h6' className={classes.title}>
                            WebApp
                        </Typography>
                        {/* панель навигации */}
                        <AppBarCollapse routes={routerStore.routes} />
                    </Toolbar>
                </AppBar>
                {/* область для вывода экземпляра текущего раздела веб-приложения */}
                <Container maxWidth="sm" className={classes.container}>
                    {this.injected.routerStore.routes.map(({ path, Component }) => (
                        <Route key={path} exact path={path}>
                            {({ match }) => (
                                <CSSTransition
                                    in={match != null}
                                    timeout={300}
                                    classNames='page'
                                    unmountOnExit
                                >
                                    <div className='page'>
                                        <Component />
                                    </div>
                                </CSSTransition>
                            )}
                        </Route>
                    ))}
                </Container>
                {/* Окно, которое появляется только при наличии содержательного значения
                в наблюдаемом свойстве error */}
                <Modal
                    // Неявное приведение типов из String в Boolean
                    open={ !!this.injected.commonStore.error }
                    onClose={ this.handleErrorModalClose }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                >
                    <div id='errorBlock' className={classes.modalContent}>
                        {this.injected.commonStore.error}
                    </div>
                </Modal>
            </div>
        </Router>
    )
  }
}
export default withStyles(styles)(App)
