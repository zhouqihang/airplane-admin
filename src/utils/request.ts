import { message } from 'antd';
import axios from 'axios';
import { IResponse, IAxiosRequestConfig, IAxiosResponse } from '../types/request';
import { ResponseError } from './request-error';

const instance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true
})

instance.interceptors.request.use(function (config: IAxiosRequestConfig) {
  return config;
})

instance.interceptors.response.use(function (response: IAxiosResponse<IResponse>) {
  console.log("🚀 ~ file: request.ts ~ line 23 ~ response", response)
  if (parseInt('' + response.status / 100) === 2) {
    if (response.data.code === 200) {
      return response
    }

    if (response.data.code === 4030) {
      window.location.href = '/login';
    }
    response.config.showErrMsg && message.error(response.data.msg);
    return Promise.reject(new ResponseError(response.data.msg, response.data.code));
  }
  return Promise.reject(new ResponseError('request faild', response.status))
})

export default instance;

/**
 * post
 * post 请求默认会显示 message 提示
 * @param url 
 * @param params 
 * @param config 
 * @returns 
 */
export function post<T>(url: string, params: any = {}, config?: IAxiosRequestConfig) {
  return instance.post<IResponse<T>>(url, params, {showErrMsg: true, ...config})
    .then(res => res.data);
}

/**
 * get
 * @param url 
 * @param params 
 * @param config 
 * @returns 
 */
export function get<T>(url: string, params: any = {}, config: IAxiosRequestConfig = {}) {
  return instance.get<IResponse<T>>(url, {
    ...config,
    params: params
  })
    .then(res => res.data);
}