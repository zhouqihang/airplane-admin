import { IGetProjectsCreatedByCurrentParams, IProjectItem } from "../types/projects";
import { IPaginationResponse } from "../types/request";
import { get } from "../utils/request";

export function getProjectsCreatedByCurrent(params: IGetProjectsCreatedByCurrentParams) {
  return get<IPaginationResponse<IProjectItem>>('/api/projects', params);
}