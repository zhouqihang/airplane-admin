export enum ERole {
  root = 1,
  project_manage = 2,
  project_dev = 3,
  project_op = 4,
}

export const roleLabel = {
  [ERole.root]: '管理员',
  [ERole.project_manage]: '项目管理员',
  [ERole.project_dev]: '开发',
  [ERole.project_op]: '运营',
}

export const roleOpts = [
  { value: ERole.root, label: roleLabel[ERole.root] },
  { value: ERole.project_manage, label: roleLabel[ERole.project_manage] },
  { value: ERole.project_dev, label: roleLabel[ERole.project_dev] },
  { value: ERole.project_op, label: roleLabel[ERole.project_op] },
]