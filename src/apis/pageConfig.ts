import { ICreatePageConfigParams, IPageConfigItem } from "../types/pageConfigs";
import { delet, get, patch, post } from "../utils/request";

function generateApi(projectId: number | string, pageId: number | string) {
  return `/api/projects/${projectId}/pages/${pageId}/page-configs`;
}

export function savePageConfig(projectId: number | string, pageId: number | string, params: ICreatePageConfigParams) {
  return post<IPageConfigItem>(generateApi(projectId, pageId), params);
}

export function getNextVersion(projectId: number | string, pageId: number | string) {
  return post<string>(generateApi(projectId, pageId) + '/nextVersion');
}