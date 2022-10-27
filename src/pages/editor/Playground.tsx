import React, { useContext } from 'react';
import { editorContext, ITreeItem } from './editorContext';
import componentMap from './componentMap';

export default function Playground() {
  const { editorState } = useContext(editorContext);

  function renderChildren(tree: ITreeItem[]) {
    return tree.map(item => {
      const EditorComponent = componentMap[item.type].EditorComponent;
      return (
        <EditorComponent key={item.componentId} componentId={item.componentId} activeId={editorState.currentActiveComponentId} {...item.props}>
          {renderChildren(item.children)}
        </EditorComponent>
      )
    })
  }
  return (
    <div className="editor-playground">
      {
        renderChildren(editorState.tree)
      }
    </div>
  )
}