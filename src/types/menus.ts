import { EStatus } from "./enum";
import { IPageItem } from "./pages";
import { IPagination, IPaginationResponse } from "./request";

export interface IMenuItem {
  id: number;
  title: string;
  /** menu query json string */
  query: Record<string, any>;
  status: EStatus;
  page: IPageItem;
  parentMenu: number;
  createTime: string;
  updateTime: string;
}

export type IGetMenuParams = IPagination & Partial<Pick<IMenuItem, 'title' | 'status'>>

export type IGetMenuResponse = IPaginationResponse<IMenuItem>;

export type IUpdateParams = Partial<Pick<IMenuItem, 'title' | 'parentMenu' | 'query' | 'status'>>

export type ICreateParams = Pick<IMenuItem, 'title' | 'query'> & Partial<Pick<IMenuItem, 'parentMenu' | 'status'>>;

export interface IFindAllParams {
  belongsTo?: number;
  status?: IMenuItem['status'];
};