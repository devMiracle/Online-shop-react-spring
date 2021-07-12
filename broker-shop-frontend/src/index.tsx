import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import commonStore from './stores/CommonStore'
import routerStore from './stores/RouterStore'
import categoryStore from './stores/CategoryStore'
import productStore from './stores/ProductStore'
import userStore from './stores/UserStore'
import cartStore from './stores/CartStore'
import { Provider } from 'mobx-react'

const stores = {
    commonStore,
    routerStore,
    userStore,
    categoryStore,
    productStore,
    cartStore
}

ReactDOM.render(
  <React.StrictMode>
      <Provider {...stores}>
            <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals();
