import { IPagination } from "./request";

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

export type IUpdateParams = Partial<Pick<IProjectItem, 'name' | 'desc' | 'status'>>;

export type IGetProjectsCreatedByCurrentParams = IPagination & Partial<Pick<IProjectItem, 'name' | 'desc' | 'status'>>
