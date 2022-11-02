import React, { createContext } from "react";
import { IContainerProps } from "../../components/Container/Component";
import { IHOCEditorContainerProps } from "../../components/HOCEditorContainer";
import componentMap, { componentTypeKeys } from "./componentMap";

export type componentPropTypes = IContainerProps

export interface ITreeItem {
  componentId: number | string;
  type: componentTypeKeys;
  props: componentPropTypes & IHOCEditorContainerProps;
  children: ITreeItem[];
}

interface IEditorContext {
  currentActiveComponentId?: string | number;
  tree: ITreeItem[];
}
export const editorContext = createContext<{
  editorState: IEditorContext
  [key: string]: any
}>({
  editorState: {
    currentActiveComponentId: undefined,
    tree: [],
  }
});

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
  }
]