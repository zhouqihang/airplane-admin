import React from 'react';
import './index.scss';

export interface IHOCEditorContainerProps {
  componentId?: string | number;
  activeId?: string | number;
}

export default function HOCEditorContainer<P>(Component: typeof React.Component<P> | React.FC<P>) {
  return function (props: IHOCEditorContainerProps & P) {
    const isActive = props.componentId === props.activeId;
    return (
      <div className={`hoc-editor-container_border ${isActive ? 'active' : ''}`} data-component-id={props.componentId}>
        <div className="hoc-editor-container">
          <Component {...props} />
        </div>
      </div>
    )
  }
}