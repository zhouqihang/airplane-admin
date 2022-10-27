import React from 'react';

export interface IContainerProps {
  children?: React.ReactNode;
}

export default function ContainerComponent(props: IContainerProps) {
  return (
    <div>
      container component
      {props.children}
    </div>
  )
}