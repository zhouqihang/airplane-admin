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
  const cache = new Map();
  cache.set('root', root);

  function addComponent(type: componentTypeKeys) {
    const parent = cache.get(editorState.currentActiveComponentId);
    if (!parent) return;
    const item = {
      componentId: Date.now(),
      type,
      props: {},
      children: []
    }
    parent.children.push(item)
    cache.set(item.componentId, item);
    setEditorState({ ...editorState });
  }

  function updateProps(props: any) {
    const parent = cache.get(editorState.currentActiveComponentId);
    if (!parent) return;
    parent.props = props;
    setEditorState({ ...editorState });
  }

  return (
    <editorContext.Provider value={{ editorState, setEditorState }}>
      <div className="editor">
        <EditorHeader></EditorHeader>
        <div className="editor-main">
          <EditorComponents onAdd={addComponent}/>
          <EditorPlayground />
          <EditorConfig
            type={cache.get(editorState.currentActiveComponentId).type}
            activeId={editorState.currentActiveComponentId}
            onPropsChange={updateProps}
          />
        </div>
      </div>
    </editorContext.Provider>
  )
}

export default PageEditor;