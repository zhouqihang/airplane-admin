import React, { HTMLAttributes } from 'react';

export interface IParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  content: string;
}
export default function Paragraph(props: IParagraphProps) {
  const { style, content, ...others } = props;
  return (
    <p style={style} {...others}>{content}</p>
  )
}