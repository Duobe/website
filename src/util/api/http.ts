import axios from 'axios'
import * as qs from 'qs'
import { IAxiosRequestConfig, IHttpResquest } from '../../interface'

enum HTTPERROR {
  LOGICERROR,
  TIMEOUTERROR,
  NETWORKERROR
}

const DEFAULTCONFIG = {
  baseURL: process.env.BASE_URL
}

const isSuccess = (v: any, res: any) => {
  return true
}

const http: IHttpResquest = {}
const methods = ['get', 'post', 'put', 'delete']

methods.forEach(v => {
  http[v] = (url: string, data: any, baseUrl?: string, headers?: object) => {
    const axiosConfig: IAxiosRequestConfig = {
      method: v,
      url,
      baseURL: baseUrl || DEFAULTCONFIG.baseURL,
      headers: { Accept: 'application/vnd.github.v3.html' },
    }
    const instance = axios.create(DEFAULTCONFIG)

    // Add a request interceptor
    instance.interceptors.request.use(cfg => {
      const queryData = {
        ts: Date.now()
      }
      // cfg.url += `&${qs.stringify(queryData)}`
      cfg.params = {
        ...cfg.params,
        ...queryData
      }
      return cfg
    }, (error) => Promise.reject(error))
    // Add a response interceptor
    instance.interceptors.response.use(response => {
      let rdata = response.data
      if (!isSuccess(v, rdata)) {
        const _err = {
          msg: rdata.msg,
          code: rdata.code,
          type: HTTPERROR[HTTPERROR.LOGICERROR],
          config: response.config
        }
        return Promise.reject(_err)
      }
      if (typeof response.data === 'object' && !isNaN(response.data.length)) {
        rdata = response.data[0]
      } else {
        rdata = response.data
      }
      return rdata
    }, error => {
      const _err = {
        msg: error.message || '网络故障',
        type: /^timeout of/.test(error.message) ? HTTPERROR[HTTPERROR.TIMEOUTERROR] : HTTPERROR[HTTPERROR.NETWORKERROR],
        config: error.config
      }
      return Promise.reject(_err)
    })
    if (v === 'get') {
      axiosConfig.params = data
    } else if (data instanceof FormData) {
      axiosConfig.data = data
    } else {
      axiosConfig.data = qs.stringify(data)
    }
    axiosConfig.startTime = new Date()
    return instance.request(axiosConfig).then(res => res).catch(err => {
      console.error(err.response || err.msg || err.stack || '未知错误')
      return Promise.reject({
        err,
        stack: err.msg || err.stack || ''
      })
    })
  }
})

export default http