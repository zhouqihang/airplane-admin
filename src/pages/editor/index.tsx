import React, { useState } from 'react';
import EditorHeader from './Header';
import EditorComponents from './Components';
import EditorPlayground from './Playground';
import EditorConfig from './Config';
import { editorContext, ITreeItem } from './editorContext';
import './index.scss';
import { componentTypeKeys } from './componentMap';

const root: ITreeItem = {
  componentId: 'root',
  type: 'container',
  props: {},
  children: []
}
function PageEditor() {

  const [editorState, setEditorState] = useState({
    currentActiveComponentId: 'root',
    tree: [root]
  });
  const [cache, setCache] = useState<Record<string, ITreeItem>>({
    root
  });

  /**
   * 添加组件
   * @param type 
   * @returns 
   */
  function addComponent(type: componentTypeKeys) {
    const parent = cache[editorState.currentActiveComponentId];
    if (!parent) return;
    const item = {
      componentId: Date.now().toString(),
      type,
      props: {},
      children: []
    }
    parent.children.push(item)
    setCache({
      ...cache,
      [item.componentId]: item
    })
    setEditorState({ ...editorState });
  }

  /**
   * 更新组件props
   * @param props 
   * @returns 
   */
  function updateProps(props: any) {
    const parent = cache[editorState.currentActiveComponentId];
    if (!parent) return;
    parent.props = props;
    setEditorState({ ...editorState });
  }

  /**
   * 点击playground中的组件
   */
  function componentActiveHandler(componentId: string) {
    setEditorState({
      ...editorState,
      currentActiveComponentId: componentId
    })
  }

  return (
    <editorContext.Provider value={{ editorState, setEditorState }}>
      <div className="editor">
        <EditorHeader></EditorHeader>
        <div className="editor-main">
          <EditorComponents onAdd={addComponent}/>
          <EditorPlayground onComponentActive={componentActiveHandler} />
          <EditorConfig
            type={cache[editorState.currentActiveComponentId].type}
            activeId={editorState.currentActiveComponentId}
            activeProps={cache[editorState.currentActiveComponentId].props}
            onPropsChange={updateProps}
          />
        </div>
      </div>
    </editorContext.Provider>
  )
}

export default PageEditor;