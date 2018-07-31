import * as React from 'react'
import { hot } from 'react-hot-loader'
import { inject, observer } from 'mobx-react'
import { format } from 'date-fns'

import { IssueStore } from '../../store/issueStore'
import { IPlainObject } from '../../interface'
import Spinner from '../../components/Spinner/Spinner';

export interface IIssueProps {
  issueStore: IssueStore
  location: IPlainObject
}

export interface IIssueState { }

@inject('issueStore')
@observer
class Issue extends React.Component<IIssueProps, IIssueState> {

  store = this.props.issueStore

  componentDidMount() {
    const url = this.props.location.state.url
    this.props.issueStore.getIssue(url)
  }

  renderDiv() {
    const issue = this.store.issue
    return (
      <div className='markdown-body'>
        <div className='details'>
          <label className='update'>{format(new Date(issue.updated_at), 'YYYY/MM/DD')}</label>
          {/* <label className='creator'>{issue.user.login}</label> */}
        </div>
        <h1 dangerouslySetInnerHTML={{ __html: issue.title }} />
        <div dangerouslySetInnerHTML={{ __html: issue.body_html }} />
      </div>
    )
  }

  render() {
    return (
      <div className='issue'>
         {this.store.pageLoading ? <Spinner /> : this.renderDiv()}
      </div>
    )
  }
}

export default hot(module)(Issue)