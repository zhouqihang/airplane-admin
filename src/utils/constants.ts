import { EStatus } from "../types/enum";

export const SESSION_STORAGE_PROJECT_KEY = 'airplane_project_id';

export const statusLabel = {
  [EStatus.disabled]: '禁用',
  [EStatus.enabled]: '启用',
}

export const titleTypeOpts = [
  { label: '一级标题', value: 'h1' },
  { label: '二级标题', value: 'h2' },
  { label: '三级标题', value: 'h3' },
  { label: '四级标题', value: 'h4' },
  { label: '五级标题', value: 'h5' },
  { label: '六级标题', value: 'h6' },
];

export const fontWeightOpts = [
  { label: 'normal', value: 'normal'},
  { label: 'bold', value: 'bold'},
  { label: 'lighter', value: 'lighter'},
  { label: '100', value: '100'},
  { label: '200', value: '200'},
  { label: '300', value: '300'},
  { label: '400', value: '400'},
  { label: '500', value: '500'},
  { label: '600', value: '600'},
  { label: '700', value: '700'},
  { label: '800', value: '800'},
  { label: '900', value: '900'},
]