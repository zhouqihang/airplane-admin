import React from 'react';
import { cns } from '../../utils/classnames';
import './index.scss';

export interface IHOCEditorContainerProps {
  componentId?: string | number;
  activeId?: string | number;
}

export interface IHOCEditorOptions<P> {
  rewriteProps?: (props: P) => P;
}

export default function HOCEditorContainer<P>(Component: typeof React.Component | React.FC<P>) {
  return function (options: IHOCEditorOptions<P>) {
    return function (props: IHOCEditorContainerProps & P) {
      const isActive = props.componentId === props.activeId;
      const { componentId, activeId, ...others } = props;
      const componentProps: any = options.rewriteProps ? options.rewriteProps(others as P) : others;

      return (
        <div
          className={cns({
            'hoc-editor-container_border': true,
            active: isActive,
          })}
          data-component-id={props.componentId}
        >
          {/* <div className="hoc-editor-container"> */}
            <Component {...componentProps} />
          {/* </div> */}
        </div>
      )
    }
  }
}