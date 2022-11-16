import { Form, Input, Radio, Select, Tabs } from 'antd';
import React, { CSSProperties } from 'react';
import ColorPicker from '../../config-board-components/ColorPicker';
import { fontWeightOpts, titleTypeOpts } from '../../utils/constants';
import { ITitleProps, titleLevelType } from './Component';

interface ITitleConfigBoardProps {
  propConfig: ITitleProps;
  onChange: (props: ITitleProps) => void;
}

const defaultSettings = {
  h1: {
    fontSize: '38px',
    fontWeight: 600
  },
  h2: {
    fontSize: '30px',
    fontWeight: 600
  },
  h3: {
    fontSize: '24px',
    fontWeight: 600
  },
  h4: {
    fontSize: '20px',
    fontWeight: 600
  },
  h5: {
    fontSize: '16px',
    fontWeight: 600
  },
  h6: {
    fontSize: '12px',
    fontWeight: 600
  },
}

export default function TitleConfigBoard(props: ITitleConfigBoardProps) {
  const { style, content, type } = props.propConfig;

  function titleLevelChangeHandler(type: titleLevelType) {
    props.onChange({
      ...props.propConfig,
      type,
      style: {
        ...style,
        ...defaultSettings[type]
      }
    })
  }

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
      <Tabs.TabPane tab="配置" key="setting">
        <Form>
          <Form.Item label="内容">
            <Input.TextArea value={content} onChange={(event) => updateProps('content', event.target.value)}/>
          </Form.Item>
          <Form.Item label="级别">
            <Select value={type} onChange={titleLevelChangeHandler}>
              {
                titleTypeOpts.map(item => (<Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>))
              }
            </Select>
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
            <Form.Item label="加粗">
            <Select value={style?.fontWeight} onChange={(value) => updateStyle('fontWeight', value)}>
              {
                fontWeightOpts.map(item => (<Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>))
              }
            </Select>
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