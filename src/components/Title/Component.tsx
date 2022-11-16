import React, { HTMLAttributes } from 'react';

export type titleLevelType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export interface ITitleProps extends HTMLAttributes<HTMLHeadElement> {
  type: titleLevelType;
  content: string;
}

export default function Title(props: ITitleProps) {
  const { type, content, ...others } = props;
  console.log(type);
  return React.createElement(type, others, content);
}