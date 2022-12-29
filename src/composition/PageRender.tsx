import React from 'react';
import componentMap from '../pages/editor/componentMap';
import { ITreeItem } from '../pages/editor/editorContext';

interface IPageRenderProps {
  tree: ITreeItem[];
}
export default function PageRender(props: IPageRenderProps) {

  function renderChildren(tree: ITreeItem[]) {
    return tree.map(item => {
      const Component = componentMap[item.type].Component;
      return (
        <Component key={item.componentId} {...item.props}>
          {renderChildren(item.children)}
        </Component>
      )
    })
  }
  
  return (
    <>
      {renderChildren(props.tree)}
    </>
  );
}