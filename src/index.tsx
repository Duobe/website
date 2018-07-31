import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { HashRouter as Router } from 'react-router-dom'

import App from './App'
import store from './store'

declare const module: any

const render = (Component: any) => {
  ReactDOM.render(
    <Provider {...store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

render(App)

if (module.hot) {
  module.hot.accept()
}
