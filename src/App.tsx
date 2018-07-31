import './styles/index.less'

import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Home from './views/Home'
import NotFound from './views/NotFound'

const App = () => (
  <Switch>
    <Route path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default hot(module)(App)