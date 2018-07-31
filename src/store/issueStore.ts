import { action, observable } from 'mobx'

import { IPlainObject } from '../interface'
import { StoreExt } from '../util/reactExt'

class IssueStore extends StoreExt {
  @observable pageLoading: boolean = false
  @observable issues: Array<any> = []
  @observable issue: IPlainObject = {}

  @observable owner: string = 'duobe'
  @observable repo: string = 'StepByStep'

  @observable page: number = 1
  @observable per_page: number = 8
  @observable total_count: number = 0
  @observable total_page_num: number = 1

  @observable order: string = 'desc'
  @observable sort: string = 'created'
  @observable query: string = `repo:${this.owner}/${this.repo} type:issue`
  @observable incomplete_results: boolean = false

  @action changeRepo = (owner: string, repo: string) => {
    this.owner = owner
    this.repo = repo
    this.query = `repo:${owner}/${repo} type:issue`
  }

  @action getIssues = async (options: { page?: number, per_page?: number }) => {
    this.pageLoading = true

    options.page = options.page || this.page
    options.per_page = options.per_page || this.per_page

    this.page = options.page
    this.per_page = options.per_page

    try {
      const res = await this.api.getIssues({
        per_page: options.per_page,
        page: options.page,
        order: this.order,
        sort: this.sort,
        q: this.query,
      })
      this.issue = {}
      this.issues = res.items
      this.incomplete_results = res.incomplete_results
      this.total_count = parseInt(res.total_count, 10)
      this.total_page_num = Math.floor((this.total_count + options.per_page - 1) / options.per_page)
    } catch (error) { throw error }

    this.pageLoading = false
  }

  @action getIssue = async (url: string) => {
    this.pageLoading = true
    try {
      const res = await this.api.getIssue(url)
      this.issue = res
    } catch (error) { }
    this.pageLoading = false
  }
}

const issueStore = new IssueStore()

export { issueStore as default, IssueStore }