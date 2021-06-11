import React from 'react'
import {Router, Route} from 'react-router-dom'
import {CommonStore} from '../stores/CommonStore'
import {RouterStore} from '../stores/RouterStore'
import {inject, observer} from "mobx-react"
import {Container, createStyles, Theme, withStyles, WithStyles} from "@material-ui/core"
import history from "../history"
import {CSSTransition} from "react-transition-group";


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

  componentDidMount() {
      /*this.injected.commonStore.setLoading(true)
        fetch('http://localhost:8080/shop/api/categories')
        .then(response => response.json())
        .then(responseBody => console.log(responseBody))
        .catch(reason => console.log(reason))
        .finally(() => this.injected.commonStore.setLoading(false))*/
  }

  render() {
    // const waitDiv = this.injected.commonStore.loading ? <div>Wait...</div> : ' '
    /* return (
        <div>
            {waitDiv}
        </div>
    )*/
    const {classes} = this.injected
    return (
        <Router history={history}>
            <div className={classes.root}>
                {/* панель приложения, "приклееная" к верхней части страницы */}

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
            </div>
        </Router>
    )
  }

}

export default withStyles(styles)(App)
