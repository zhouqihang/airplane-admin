import React, { HTMLAttributes } from 'react';
import './index.scss';

export interface IContainerProps extends HTMLAttributes<HTMLDivElement> {
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