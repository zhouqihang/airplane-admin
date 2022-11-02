import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Tabs } from 'antd';
import useCssEditor from '../../hooks/useCssEditor';
import ColorPicker from '../../config-board-components/ColorPicker';
import BorderPicker from '../../config-board-components/BorderPicker';

interface IContainerConfigBoardProps {
  onChange: (props: any) => void;
}

export default function ContainerConfigBoard(props: IContainerConfigBoardProps) {
  const { cssState, style, generateSetFunc, getStyleObject, bindValue } = useCssEditor();

  useEffect(function () {
    props.onChange({ style });
  }, [style])
  return (
      <Tabs>
        <Tabs.TabPane tab="样式" key="style">
          <Form>
            <Form.Item label="内边距">
              {bindValue(<Input placeholder="例：24px" defaultValue="24px" />)({event: 'onChange', field: 'padding'})}
            </Form.Item>
            <Form.Item label="外边距">
              {bindValue(<Input placeholder="例：24px" defaultValue="24px" />)({event: 'onChange', field: 'margin'})}
            </Form.Item>
            <Form.Item label="背景色">
              {bindValue(<ColorPicker />)({event: 'onChange', field: 'backgroundColor'})}
            </Form.Item>
            <Form.Item label="圆角">
              {bindValue(<Input placeholder="例：4px" />)({event: 'onChange', field: 'borderRadius'})}
            </Form.Item>
            <Form.Item label="边框">
              {bindValue(<BorderPicker />)({event: 'onChangeWithValue', field: 'border'})}
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="配置" key="setting">
          内容 2
        </Tabs.TabPane>
      </Tabs>
  )
}