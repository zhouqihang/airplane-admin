import { Button, Collapse } from 'antd';
import React from 'react';
import { componentTypeKeys, componentTable } from './componentMap';

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
      </Collapse>
    </div>
  )
}

export default EditorComponents;