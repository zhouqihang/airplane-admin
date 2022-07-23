import { IPagination } from "./request";

export enum EUserStatus {
  enabled = 1,
  disabled = 2,
}

export interface IUsersRequestParams extends IPagination {
  username: string;
  email: string;
  status: EUserStatus;
}

export interface IUsersItem {
  id: number,
  username: string,
  account: string,
  password: string,
  email: string,
  status: EUserStatus,
  softRemoved: false,
  createTime: string,
  updateTime: string
}

export interface ICreateUserParams {
  username: string;
  account: string;
  password: string;
  email: string;
  status: EUserStatus;
}