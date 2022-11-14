import React from 'react';
import componentMap, { componentTypeKeys } from './componentMap';
import { ReactComponent as EmptySVG } from '../../assets/images/want-empty.svg';
import { ITreeItem } from './editorContext';
interface IConfigProps {
  type: componentTypeKeys;
  activeId?: string | number;
  onPropsChange: (props: any) => void;
  activeProps: ITreeItem['props'];
}

export default function Config(props: IConfigProps) {
  const Component = componentMap[props.type].ConfigBoard;

  function renderEmpyt() {
    return (
      <div className="editor-config__empty">
        <EmptySVG fill="#999" />
        <p>请选择组件~</p>
      </div>
    )
  }
  return (
    <div className="editor-config">
      {props.activeId ? <Component onChange={props.onPropsChange} propConfig={props.activeProps} /> : renderEmpyt()}
    </div>
  )
}