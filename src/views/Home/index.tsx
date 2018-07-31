import './index.less'

import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { hot } from 'react-hot-loader'

import NotFound from '../NotFound'
import Issue from './Issue'
import Issues from './Issues'
import { IssueStore } from '../../store/issueStore'

export interface IHomeProps {
  issueStore: IssueStore
  history: any
  match: {
    url: string
  }
}

export interface IHomeState { }

@inject('issueStore')
@observer
class Home extends React.Component<IHomeProps, IHomeState> {

  state = {
    owner: '',
    repo: '',
  }

  handleInputChange = (e: any) => {
    const target = e.target
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit = () => {

    if (this.state.owner && this.state.repo) {
      this.props.issueStore.changeRepo(this.state.owner, this.state.repo)
      this.props.issueStore.getIssues({ page: 1 })
      this.props.history.push('/issues')
    }

  }

  render() {
    const { match } = this.props
    return (
      <div className='home'>
        <header>
          <Link to={`${match.url}issues`}>Home</Link>
          <div className='form'>
            <input type="text" name='owner' defaultValue={this.state.owner} placeholder='owner' onChange={this.handleInputChange} autoComplete='off' />
            <input type="text" name='repo' defaultValue={this.state.repo} placeholder='repo' onChange={this.handleInputChange} autoComplete='off' />
            <button onClick={this.handleSubmit}>submit</button>
          </div>
          <a href="https://github.com/Duobe/website">Github</a>
        </header>
        <footer>
          <p>input owner and repository to view github issues. </p>
          <p>Written by <a href='https://github.com/Duobe'>Duobe</a>.
          </p>
        </footer>
        <Route>
          <Switch>
            <Route path="/issues" component={Issues} />
            <Route path="/issue/:id" component={Issue} />
            <Route component={NotFound} />
          </Switch>
        </Route>
      </div>
    )
  }
}
export default hot(module)(Home)