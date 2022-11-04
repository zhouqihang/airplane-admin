import { Form, InputNumber, Radio, Space, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import ColorPicker from '../ColorPicker';

interface IBorderPicker {
  onChange?: (value: string) => void;
  defaultValue?: string;
}

const borderStyles = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
];

export default function BorderPicker(props: IBorderPicker) {
  const [hasBorder, setHasBorder] = useState(false);
  const [config, setConfig] = useState({
    borderWidth: 0,
    borderColor: '',
    borderStyle: 'solid'
  })

  useEffect(function () {
    changeHandler();
  }, [config, hasBorder]);

  function changeConfig(key: keyof typeof config, value: unknown) {
    setConfig({ ...config, [key]: value});
  }

  function changeHandler() {
    props.onChange && props.onChange(dispatch());
  }

  function dispatch() {
    if (!hasBorder) {
      return '';
    }
    if (!config.borderWidth) {
      return '';
    }
    return `${config.borderWidth}px ${config.borderStyle} ${config.borderColor || 'transparent'}`;
  }

  function renderBorderConfig() {
    return (
      <Space direction="vertical">
          <Space>
            <span>边框宽度</span>
            <InputNumber
              min={0}
              defaultValue={0}
              addonAfter="px"
              value={config.borderWidth}
              onChange={(value) => changeConfig('borderWidth', value)}
            />
          </Space>
          <Space>
            <span>边框颜色</span>
            <ColorPicker
              defaultValue={config.borderColor}
              onChange={(event) => changeConfig('borderColor', event.target.value)}
            ></ColorPicker>
          </Space>
          <Space>
            <span>边框样式</span>
            <Select defaultValue={config.borderStyle} value={config.borderStyle} onChange={(event) => changeConfig('borderStyle', event)}>
              {
                borderStyles.map((item) => {
                  return <Select.Option value={item} key={item}>{item}</Select.Option>
                })
              }
            </Select>
          </Space>
      </Space>
    )
  }
  return (
    <>
      <Radio.Group onChange={(e) => setHasBorder(e.target.value)} value={hasBorder}>
        <Radio value={false}>无</Radio>
        <Radio value={true}>有</Radio>
      </Radio.Group>
      { hasBorder ? renderBorderConfig() : null }
    </>
  )
}