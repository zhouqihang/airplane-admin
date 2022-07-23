import { ILoginParams } from "../types/auth";
import { post } from '../utils/request';

export function login(params: ILoginParams) {
  return post<boolean>('/api/login', {
    account: params.account,
    password: params.pwd
  })
}