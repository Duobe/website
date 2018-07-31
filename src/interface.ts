import { AxiosRequestConfig } from 'axios'

export interface IAxiosRequestConfig extends AxiosRequestConfig {
  startTime?: Date
}

export interface IHttpResquest {
  [v: string]: any,
  get?(url: string, data?: any, baseUrl?: string): Promise<any>,
  post?(url: string, data?: any, baseUrl?: string): Promise<any>,
  delete?(url: string, data?: any, baseUrl?: string): Promise<any>,
  put?(url: string, data?: any, baseUrl?: string): Promise<any>
}

export interface IPlainObject {
  [propName: string]: any
}

export interface IBooleanObject {
  [propName: string]: boolean
}

export interface RequireImport {
  default: any
}
