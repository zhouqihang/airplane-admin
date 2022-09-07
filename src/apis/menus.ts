import { message } from "antd";
import { useState } from "react";
import { EStatus } from "../types/enum";
import { IGetMenuParams, IUpdateParams, IMenuItem, ICreateParams, IFindAllParams } from "../types/menus";
import { IPaginationResponse } from "../types/request";
import { delet, get, patch, post } from "../utils/request";

/**
 * 分页获取menus
 * 
 * @param params 
 * @param projectId 
 * @returns 
 */
export function getMenusByPage(params: IGetMenuParams, projectId: number | string) {
  return get<IPaginationResponse<IMenuItem>>('/api/projects/' + projectId + '/menus', params)
}

export function useGetMenusByPage() {
  const [menus, setMenus] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  })

  async function request(params: IGetMenuParams, projectId: number | string) {
    setLoading(true);
    try {
      const res = await getMenusByPage(params, projectId);
      const { list, page, pageSize, total } = res.data;
      setMenus(list);
      setPagination({
        page,
        pageSize,
        total
      })
    }
    catch (err) {
      message.error('菜单列表获取失败');
    }
    finally {
      setLoading(false);
    }
  }

  return {
    menus,
    loading,
    pagination,
    request
  }
}

/**
 * 更新单个 menu
 * @param id 
 * @param projectId 
 * @param params 
 * @returns 
 */
export function updateMenu(id: number, projectId: string | number, params: IUpdateParams) {
  return patch(`/api/projects/${projectId}/menus/${id}`, params);
}

/**
 * 创建 menu
 * @param projectId 
 * @param params 
 * @returns 
 */
export function createMenu(projectId: number, params: ICreateParams) {
  return post<IMenuItem>(`/api/projects/${projectId}/menus`, params);
}

/**
 * 查找所有一级菜单
 * @param projectId 
 * @param params 
 * @returns 
 */
export function findAllMenus(projectId: number, params?: IFindAllParams) {
  return get<IMenuItem[]>(`/api/projects/${projectId}/menus/all`, params);
}

/**
 * 查询单个详情
 * @param projectId 
 * @param id 
 * @returns 
 */
export function findOne(projectId: number, id: number) {
  return get<IMenuItem>(`/api/projects/${projectId}/menus/${id}`);
}

/**
 * 删除单个 menu
 * @param projectId 
 * @param id 
 * @returns 
 */
export function removeMenu(projectId: number | string, id: number) {
  return delet(`/api/projects/${projectId}/menus/${id}`)
}