import { Form, Input, InputNumber, Radio, Tabs } from 'antd';
import React, { CSSProperties } from 'react';
import ColorPicker from '../../config-board-components/ColorPicker';
import { IParagraphProps } from './Component';

interface IParagraphConfigBoardProps {
  propConfig: IParagraphProps;
  onChange: (props: IParagraphProps) => void;
}

export default function ParagraphConfigBoard(props: IParagraphConfigBoardProps) {

  const { style } = props.propConfig;
  const content = props.propConfig.content;

  function updateProps(key: string, value: any) {
    props.onChange({
      ...props.propConfig,
      [key]: value
    })
  }
  function updateStyle(key: keyof CSSProperties, value: any) {
    updateProps('style', {
      ...style,
      [key]: value
    })
  }

  return (
    <Tabs>
        <Tabs.TabPane tab="样式" key="style">
          <Form>
            <Form.Item label="内容">
              <Input.TextArea value={content} onChange={(event) => updateProps('content', event.target.value)}/>
            </Form.Item>
            <Form.Item label="文字颜色">
              <ColorPicker value={style?.color} onChange={(event) => updateStyle('color', event.target.value)} />
            </Form.Item>
            <Form.Item label="文字大小">
              <Input value={style?.fontSize} onChange={(event) => updateStyle('fontSize', event.target.value)} />
            </Form.Item>
            <Form.Item label="对齐方式">
              <Radio.Group value={style?.textAlign} onChange={(event) => updateStyle('textAlign', event.target.value)}>
                <Radio value="left">左对齐</Radio>
                <Radio value="center">中间对齐</Radio>
                <Radio value="right">右对齐</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="行高">
              <InputNumber value={style?.lineHeight} onChange={(value) => updateStyle('lineHeight', value)} step={0.1} precision={1} />
            </Form.Item>
            <Form.Item label="背景颜色">
              <ColorPicker value={style?.backgroundColor} onChange={(event) => updateStyle('backgroundColor', event.target.value)} />
            </Form.Item>
            <Form.Item label="外边距">
              <Input value={style?.margin} onChange={(event) => updateStyle('margin', event.target.value)} />
            </Form.Item>
            <Form.Item label="内边距">
              <Input value={style?.padding} onChange={(event) => updateStyle('padding', event.target.value)} />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
    </Tabs>
  )
}