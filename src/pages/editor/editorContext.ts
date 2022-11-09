import React, { createContext } from "react";
import { IContainerProps } from "../../components/Container/Component";
import { IHOCEditorContainerProps } from "../../components/HOCEditorContainer";
import { ITableProps } from "../../components/Table/Component";
import componentMap, { componentTypeKeys } from "./componentMap";

export type componentPropTypes = IContainerProps &ITableProps;

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

