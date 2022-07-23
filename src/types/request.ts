import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IPagination {
  page: number;
  pageSize: number;
}

/**
 * 服务端响应数据结构
 */
export interface IResponse<T = unknown> {
  data: T;
  msg: string;
  code: number;
}

export interface IPaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  list: Array<T>
}

/**
 * axios请求配置
 * reason: 添加showErrMsg
 */
export interface IAxiosRequestConfig extends AxiosRequestConfig {
  /** 是否显示请求失败的 message 提示 */
  showErrMsg?: boolean;
}

/**
 * axios响应结构
 * reason: 更改config数据类型
 */
export interface IAxiosResponse<T> extends AxiosResponse {
  data: T;
  config: IAxiosRequestConfig;
}
