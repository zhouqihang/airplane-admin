import { EStatus } from "./enum";
import { IMenuItem } from "./menus";
import { IPagination } from "./request";
import { IUsersItem } from "./users";

export interface IPageItem {
  id: number;
  pageName: string;
  status: EStatus;
  updator: IUsersItem;
  menus: IMenuItem[];
  createTime: string;
  updateTime: string;
}

export type IPageListParams = IPagination & Partial<Pick<IPageItem, 'pageName' | 'status'>>;

export type IUpdateParams = Partial<Pick<IPageItem, 'pageName' | 'status'>>

export interface ICreateParams {
  pageName: IPageItem['pageName'];
  status: IPageItem['status'];
}