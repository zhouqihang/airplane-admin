import { ICreatePageConfigParams, IPageConfigDetail, IPageConfigItem } from "../types/pageConfigs";
import { delet, get, patch, post } from "../utils/request";

function generateApi(projectId: number | string, pageId: number | string) {
  return `/api/projects/${projectId}/pages/${pageId}/page-configs`;
}

/**
 * 保存配置
 * @param projectId 
 * @param pageId 
 * @param params 
 * @returns 
 */
export function savePageConfig(projectId: number | string, pageId: number | string, params: ICreatePageConfigParams) {
  return post<IPageConfigItem>(generateApi(projectId, pageId), params);
}

/**
 * 获取最新的可用版本号
 * @param projectId 
 * @param pageId 
 * @returns 
 */
export function getNextVersion(projectId: number | string, pageId: number | string) {
  return post<string>(generateApi(projectId, pageId) + '/nextVersion');
}

/**
 * 根据id查询指定版本的配置，如果不传id，则查询最新版本的配置
 * @param projectId 
 * @param pageId 
 * @param id 
 * @returns 
 */
export function getConfById<T>(projectId: number | string, pageId: number | string, id?: number | string) {
  return get<IPageConfigDetail<T>>(generateApi(projectId, pageId) + '/getById', { id });
}