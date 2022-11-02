import Container from "../../components/Container";

export interface IComponentTableChild {
  name: string;
  type: componentTypeKeys;
}
interface IComponentTable {
  groupName: string;
  children: IComponentTableChild[];
}
export const componentTable: IComponentTable[] = [
  {
    groupName: '容器组件',
    children: [
      {
        name: '容器',
        type: 'container',
      }
    ]
  },
  {
    groupName: '表单组件',
    children: [],
  },
  {
    groupName: '数据显示组件',
    children: []
  }
]

export type componentTypeKeys = keyof typeof componentMap;
const componentMap = {
  'container': Container
};


export default componentMap;
