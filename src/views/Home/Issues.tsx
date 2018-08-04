import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Spinner from '../../components/Spinner/Spinner'
import { IssueStore } from '../../store/issueStore'

export interface IIssuesProps {
  issueStore: IssueStore
}

export interface IIssuesState { }

interface IIssue {
  id: number
  number: number
  url: string
  title: string
  body_html: string
  created_at: Date
  labels: [{
    id: number
    name: string
  }]
}

@inject('issueStore')
@observer
class Issues extends React.Component<IIssuesProps, IIssuesState> {

  store: IssueStore = this.props.issueStore

  componentDidMount() {
    this.store.getIssues({ page: 1 })
  }

  getFirstImg(val: string): string {
    const img = /<img[^>]*>/.exec(val)
    return img && img[0] || ''
  }

  renderIssue() {
    return this.store.issues.map((issue: IIssue) => (
      <div className='item' key={issue.id}>
        <div className='line'></div>
        <span>{format(new Date(issue.created_at), 'MM/DD/YYYY')}</span>
        {
          issue.labels.map(label => <label key={label.id}>{label.name.toUpperCase()}</label>)
        }
        <p>
          <Link
            title={issue.title}
            to={{ pathname: `/issue/${issue.number}`, state: { url: issue.url } }}
          >
            {issue.title}
          </Link>
        </p>
        <div
          className='image-wrapper'
          dangerouslySetInnerHTML={{ __html: this.getFirstImg(issue.body_html) }}
        />
      </div>
    ))
  }

  handlePrePage() {
    this.store.getIssues({ page: this.store.page - 1 })
  }

  handleNextPage() {
    this.store.getIssues({ page: this.store.page + 1 })
  }

  reloadPage() {
    const { page, total_page_num } = this.store
    if (total_page_num === 1) return

    return (
      <div className='pagination'>
        {
          page === 1
            ? <button className='pre' disabled onClick={() => this.handlePrePage()}>←</button>
            : <button className='pre' onClick={() => this.handlePrePage()}>←</button>
        }
        {
          total_page_num === page
            ? <button className='next' disabled onClick={() => this.handleNextPage()}>→</button>
            : <button className='next' onClick={() => this.handleNextPage()}>→</button>
        }

      </div>
    )
  }

  renderIssues() {
    return (
      <div>
        {this.store.pageLoading ? <Spinner /> : (
          <div className='list'>
            {this.renderIssue()}
            {this.reloadPage()}
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className='issues'>
        {this.renderIssues()}
      </div>
    )
  }
}

export default hot(module)(Issues)