import React, { useContext } from 'react';
import { editorContext, ITreeItem } from './editorContext';
import componentMap from './componentMap';

interface IPlaygroundProps {
  onComponentActive: (componentId: string) => void;
}

export default function Playground(props: IPlaygroundProps) {
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
  function playgroundClickHandler(event: React.MouseEvent<HTMLElement>) {
    let node: HTMLElement | null = event.target as HTMLElement;
    while (node) {
      if (node.dataset && node.dataset.componentId) {
        props.onComponentActive(node.dataset.componentId);
        break;
      }
      node = node.parentNode as HTMLElement;
    }
  }
  return (
    <div className="editor-playground" onClick={playgroundClickHandler}>
      {
        renderChildren(editorState.tree)
      }
    </div>
  )
}