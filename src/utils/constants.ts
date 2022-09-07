import { EStatus } from "../types/enum";

export const SESSION_STORAGE_PROJECT_KEY = 'airplane_project_id';

export const statusLabel = {
  [EStatus.disabled]: '禁用',
  [EStatus.enabled]: '启用',
}