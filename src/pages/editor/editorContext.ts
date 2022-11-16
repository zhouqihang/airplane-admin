import React, { createContext } from "react";
import { componentTypeKeys } from "./componentMap";

export interface ITreeItem {
  componentId: number | string;
  type: componentTypeKeys;
  props: any;
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

