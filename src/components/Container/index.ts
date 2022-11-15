import HOCEditorContainer from "../HOCEditorContainer";
import ContainerComponent, { IContainerProps } from "./Component";
import ContainerConfigBoard from "./ConfigBoard";

const index = {
  Component: ContainerComponent,
  ConfigBoard: ContainerConfigBoard,
  EditorComponent: HOCEditorContainer<IContainerProps>(ContainerComponent)({}),
  defaultProps: {
    style: {
      margin: '24px 0',
      padding: '24px',
      backgroundColor: '#fff',
      borderRadius: '4px',
    }
  },
  contains: [
    'table',
    'paragraph'
  ]
};

export default index;