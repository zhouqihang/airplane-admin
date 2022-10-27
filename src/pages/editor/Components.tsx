import { Button, Collapse } from 'antd';
import React from 'react';
import { componentTypeKeys } from './componentMap';
import { componentTable } from './editorContext';

interface IEditorComponentsProps {
  onAdd: (item: componentTypeKeys) => void
}

const Panel = Collapse.Panel;

function EditorComponents(props: IEditorComponentsProps) {
  function addComponent(type: componentTypeKeys) {
    // TODO 
    props.onAdd(type)
  }
  return (
    <div className="editor-components">
      <Collapse defaultActiveKey={['1']} ghost>
        {
          componentTable.map((group, groupIndex) => {
            return (
              <Panel header={group.groupName} key={groupIndex + 1}>
                {
                  group.children.map(item => {
                    return <Button onClick={() => addComponent(item.type)} key={item.name}>{item.name}</Button>
                  })
                }
              </Panel>
            )
          })
        }
        <Panel header="表单组件" key="2">
          <p>123</p>
        </Panel>
        <Panel header="数据显示组件" key="3">
          <p>123</p>
        </Panel>
      </Collapse>
    </div>
  )
}

export default EditorComponents;