import { EStatus } from "./enum";
import { IPageItem } from "./pages";
import { IPagination, IPaginationResponse } from "./request";

export interface IMenuItem {
  id: number;
  title: string;
  routerName: string;
  /** menu query json string */
  query: string;
  status: EStatus;
  page: IPageItem;
  parentMenu: number;
  createTime: string;
  updateTime: string;
}

export type IGetMenuParams = IPagination & Partial<Pick<IMenuItem, 'title' | 'status'>>

export type IGetMenuResponse = IPaginationResponse<IMenuItem>;

export type IUpdateParams = Partial<Pick<IMenuItem, 'title' | 'parentMenu' | 'query' | 'routerName' | 'status'>>

export type ICreateParams = Pick<IMenuItem, 'title' | 'routerName' | 'query'> & Partial<Pick<IMenuItem, 'parentMenu' | 'status'>>;

export interface IFindAllParams {
  belongsTo?: number;
  status?: IMenuItem['status'];
};