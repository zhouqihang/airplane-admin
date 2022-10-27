import HOCEditorContainer from "../HOCEditorContainer";
import ContainerComponent, { IContainerProps } from "./Component";
import ContainerConfigBoard from "./ConfigBoard";

export default {
  Component: ContainerComponent,
  ConfigBoard: ContainerConfigBoard,
  EditorComponent: HOCEditorContainer<IContainerProps>(ContainerComponent)
};

