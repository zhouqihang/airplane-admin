import { IPageItem } from "./pages";
import { IUsersItem } from "./users";

export interface IPageConfigItem {
  id: number;
  updator: IUsersItem;
  version: string;
  belongsToPage: IPageItem;
  jsonConfig: string;
  updateTime: string;
}

export interface ICreatePageConfigParams extends Pick<IPageConfigItem, "version" | "jsonConfig"> {
  pageId: number | string;
}

export interface IPageConfigDetail<T> extends Pick<IPageConfigItem, 'id' | 'version' | 'updateTime'> {
  jsonConfig: {
    components: T[]
  };
}