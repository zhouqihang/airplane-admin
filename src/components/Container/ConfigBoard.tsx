import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Tabs } from 'antd';
import useCssEditor from '../../hooks/useCssEditor';
import ColorPicker from '../../config-board-components/ColorPicker';
import BorderPicker from '../../config-board-components/BorderPicker';
import { IContainerProps } from './Component';

interface IContainerConfigBoardProps {
  onChange: (props: any) => void;
  propConfig?: IContainerProps;
}

export default function ContainerConfigBoard(props: IContainerConfigBoardProps) {
  const { style, bindValue, updateCssState } = useCssEditor({
    padding: '24px',
    margin: '24px 0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    ...props.propConfig?.style
  });

  // useEffect(function () {
  //   if (props.propConfig?.style) {
  //     updateCssState(props.propConfig.style);
  //   }
  // }, [])

  useEffect(function () {
    props.onChange({ style });
  }, [style])
  return (
      <Tabs>
        <Tabs.TabPane tab="样式" key="style">
          <Form>
            <Form.Item label="内边距">
              {bindValue(<Input placeholder="例：24px" />)({event: 'onChange', field: 'padding'})}
            </Form.Item>
            <Form.Item label="外边距">
              {bindValue(<Input placeholder="例：24px" />)({event: 'onChange', field: 'margin'})}
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