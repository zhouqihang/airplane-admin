import { useState } from "react";
import { ICreateParams, IPageItem, IPageListParams, IUpdateParams } from "../types/pages";
import { IResponse, IPaginationResponse } from "../types/request";
import { delet, get, patch, post } from "../utils/request";

export function findByPage(projectId: number | string, params: IPageListParams) {
  return get<IPaginationResponse<IPageItem>>(`/api/projects/${projectId}/pages`, params)
}

export function updatePages(projectId: number | string, pageId: number | string, params: IUpdateParams) {
  return patch<IPageItem>(`/api/projects/${projectId}/pages/${pageId}`, params);
}

export function createPage(projectId: number | string, params: ICreateParams) {
  return post<IPageItem>(`/api/projects/${projectId}/pages`, params);
}

export function getOnePage(projectId: number | string, pageId: number) {
  return get<IPageItem>(`/api/projects/${projectId}/pages/${pageId}`);
}

export function removePage(projectId: number | string, pageId: number) {
  return delet<boolean>(`/api/projects/${projectId}/pages/${pageId}`);
}

export function getAllPages(projectId: number | string) {
  return get<IPageItem[]>(`/api/projects/${projectId}/pages/all`);
}

export function useGetOnePage() {
  const [page, setPage] = useState<IPageItem>();
  const [loading, setLoading] = useState(false);
  async function requestPage(projectId: number | string, pageId: number) {
    setLoading(true);
    try {
      const res = await getOnePage(projectId, pageId);
      setPage(res.data)
    }
    catch (err) {}
    finally {
      setLoading(false)
    }
  }

  return { page, loading, requestPage };
}

export function useFindByPage(projectId: number | string) {
  const [pages, setPages] = useState<IPageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  })

  async function request(params: IPageListParams) {
    setLoading(true);
    const res = await findByPage(projectId, params);
    const { list, page, pageSize, total } = res.data;
    setPages(list);
    setLoading(false);
    setPagination({
      page,
      pageSize,
      total,
    })
  }

  return {
    pages,
    loading,
    pagination,
    request
  }
}