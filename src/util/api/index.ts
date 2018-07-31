import http from './http'

const BASEURL = 'https://api.github.com/'

export function getIssues(data?: object): Promise<any> {
  return http.get!('/search/issues', data || {}, BASEURL)
}

export function getIssue(url: string): Promise<any> {
  return http.get!(url)
}