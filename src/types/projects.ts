import { IMenuItem } from "./menus";
import { IPageItem } from "./pages";
import { IPagination } from "./request";
import { ERole } from "./role";

export enum EProjectStatus {
  enabled = 1,
  disabled = 2,
}

export interface IProjectItem {
  id: number;
  name: string;
  desc: string;
  status: EProjectStatus;
  createTime: string;
  updateTime: string;
}

export type ICreateParams = Pick<IProjectItem, 'name' | 'desc' | 'status'>;
export type IUpdateParams = Partial<Pick<IProjectItem, 'name' | 'desc' | 'status'>>;

export type IGetProjectsCreatedByCurrentParams = IPagination & Partial<Pick<IProjectItem, 'name' | 'desc' | 'status'>>

export interface IUserProjectItem {
  id: number;
  userId: number;
  projectId: number;
  role: ERole;
}

interface IPageItemWithConfig extends IPageItem {
  jsonConfig: {
    components: any[];
  }
}
export interface IProjectConf {
  globalConfig: any;
  apisConfig: any;
  menusConfig: {
    children: IMenuItem[];
  },
  pagesConfig: {
    children: IPageItemWithConfig[];
  }
}