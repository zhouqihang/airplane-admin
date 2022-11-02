import React from 'react';
import './index.scss';

export interface IContainerProps {
  children?: React.ReactNode;
}

export default function ContainerComponent(props: IContainerProps) {
  return (
    <div className="com-container" {...props}>
      container component
      {props.children}
    </div>
  )
}