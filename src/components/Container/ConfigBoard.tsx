import React, { CSSProperties } from 'react';
import { Form, Input, Tabs } from 'antd';
import ColorPicker from '../../config-board-components/ColorPicker';
import BorderPicker from '../../config-board-components/BorderPicker';
import { IContainerProps } from './Component';

interface IContainerConfigBoardProps {
  onChange: (props: any) => void;
  propConfig?: IContainerProps;
}

export default function ContainerConfigBoard(props: IContainerConfigBoardProps) {
  const style = props.propConfig?.style || {};
  function changeHandler(key: keyof CSSProperties) {
    return function (event: React.ChangeEvent<HTMLInputElement> | string) {
      props.onChange({
        style: {
          ...props.propConfig?.style,
          [key]: typeof event === 'string' ? event : event.target.value
        }
      })
    }
  }
  return (
      <Tabs>
        <Tabs.TabPane tab="样式" key="style">
          <Form>
            <Form.Item label="内边距">
              <Input placeholder="例：24px" value={style.padding} onChange={changeHandler('padding')} />
            </Form.Item>
            <Form.Item label="外边距">
              <Input placeholder="例：24px" value={style.margin} onChange={changeHandler('margin')} />
            </Form.Item>
            <Form.Item label="背景色">
              <ColorPicker value={style.backgroundColor} onChange={changeHandler('backgroundColor')} />
            </Form.Item>
            <Form.Item label="圆角">
              <Input placeholder="例：4px" value={style.borderRadius} onChange={changeHandler('borderRadius')} />
            </Form.Item>
            <Form.Item label="边框">
              <BorderPicker value={style.border as string} onChange={changeHandler('border')} />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="配置" key="setting">
          内容 2
        </Tabs.TabPane>
      </Tabs>
  )
}