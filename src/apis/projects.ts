import { message } from "antd";
import { useState } from "react";
import { ICreateParams, IGetProjectsCreatedByCurrentParams, IProjectItem, IUpdateParams, IUserProjectItem } from "../types/projects";
import { IPaginationResponse } from "../types/request";
import { delet, get, patch, post } from "../utils/request";

export function getProjectsCreatedByCurrent(params: IGetProjectsCreatedByCurrentParams) {
  return get<IPaginationResponse<IProjectItem>>('/api/projects', params);
}

export function useGetProjectsCreatedByCurrent() {
  const [projects, setProjects] = useState<IProjectItem[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  async function requestProjects(params: IGetProjectsCreatedByCurrentParams) {
    try {
      setLoading(true);
      const res = await getProjectsCreatedByCurrent(params);
      const { list, page, pageSize, total } = res.data;
      setProjects(list);
      setPagination({
        page,
        pageSize,
        total
      })
    }
    catch(err) {
      message.error('项目列表获取失败');
    }
    finally {
      setLoading(false);
    }
  }

  return {
    projects,
    pagination,
    loading,
    requestProjects
  }
}

export function removeProject(id: number) {
  return delet('/api/projects/' + id);
}

export function updateProject(id: number, params: IUpdateParams) {
  return patch<IProjectItem>('/api/projects/' + id, params);
}

export function createProject(params: ICreateParams) {
  return post<IProjectItem>('/api/projects', params);
}

export function getProject(id: number) {
  return get<IProjectItem>('/api/projects/' + id);
}

export function useGetProject() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<IProjectItem>()
  async function requestProject(id: number) {
    try {
      setLoading(true);
      const res = await getProject(id);
      setProject(res.data);
    }
    catch(err){}
    finally {
      setLoading(false);
    }
  }
  return {
    loading,
    project,
    requestProject
  }
}

export function getProjectUsers(id: number) {
  return get<IUserProjectItem[]>('/api/projects/' + id + '/users');
}

export function updateProjectUsers(id: number, params: IUserProjectItem) {
  return post<boolean>('/api/projects/' + id + '/users', params)
}

export function removeProjectUsers(id: number, mapId: number) {
  return delet<boolean>('/api/projects/' + id + '/users/' + mapId);
}