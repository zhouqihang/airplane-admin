import React from 'react';
import './index.scss';

export interface IHOCEditorContainerProps {
  componentId?: string | number;
  activeId?: string | number;
}

export default function HOCEditorContainer<P>(Component: typeof React.Component | React.FC) {
  return function (props: IHOCEditorContainerProps & P) {
    const isActive = props.componentId === props.activeId;
    const { componentId, activeId, ...others } = props;
    return (
      <div className={`hoc-editor-container_border ${isActive ? 'active' : ''}`} data-component-id={props.componentId}>
        {/* <div className="hoc-editor-container"> */}
          <Component {...others} />
        {/* </div> */}
      </div>
    )
  }
}