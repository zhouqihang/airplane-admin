import Container from "../../components/Container";
import Table from '../../components/Table';
import Paragraph from '../../components/Paragraph';

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
    children: [
      {
        name: '表格',
        type: 'table'
      }
    ]
  },
  {
    groupName: '文字和提示',
    children: [
      {
        name: '段落',
        type: 'paragraph'
      }
    ]
  }
]

export type componentTypeKeys = keyof typeof componentMap;
const componentMap = {
  'container': Container,
  'table': Table,
  'paragraph': Paragraph
};


export default componentMap;
